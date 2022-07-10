import {
    Injectable,
    NestMiddleware,
    Scope,
    UnauthorizedException,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { stringify } from 'querystring';
import { AuthService } from '../auth/auth.service';
import { RequestService } from '../request/request.service';

// https://www.youtube.com/watch?v=x1W3FJ1RJlM

// Este metodo se encarga de fijarse que esten los headers de authorization 'basic' o 'bearer'.
@Injectable()
export class AuthenticationMiddleWare implements NestMiddleware {
    constructor(
        private readonly requestService: RequestService,
        private readonly authservice: AuthService,
    ) { }

    async use(req: Request, res: Response, next: NextFunction) {

        try {

            const header_req = String(req.headers['authorization']);
            let token;
            if (header_req.toLocaleLowerCase().includes('basic')) {
                // Si hay un basic, logeamos al usuario con ese basic y le generamos un token jwt
                let username = Buffer.from(header_req.split(' ')[1], 'base64')
                    .toString('ascii')
                    .split(':')[0];
                let userpass = Buffer.from(header_req.split(' ')[1], 'base64')
                    .toString('ascii')
                    .split(':')[1];
                let isValid = await this.authservice.validateUser(username, userpass); // Si manda el header basic lo valido
                if (isValid) {
                    token = await this.authservice.login(username);
                    token = token.access_token;
                    req.headers['authorization'] = 'Bearer ' + token; // Preparamos el header para el response que tenga el bearer token
                    await this.authservice.verify(token); // Verificamos el token del header y obtenemos al usuario que lo genero
                } else {
                    throw "Bad credentials";
                }
            } else if (header_req.toLocaleLowerCase().includes('bearer')) {
                token = header_req.split(' ')[1];
                await this.authservice.verify(token); // Verificamos el token del header y obtenemos al usuario que lo genero
            } else {
                //throw "No authorization provided"
                // TODO: ver de agregar esto... si no se pasa ningun header (ni basic ni bearer) no se maneja bien
            }

            next();

        } catch (err: any) {
            next(new UnauthorizedException(err));
        }

    }
}