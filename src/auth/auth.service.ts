import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import Result from '../Result';
import ErrorResponse from '../ErrorResponse';
import { RequestService } from '../request/request.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.entity';

@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        private requestService: RequestService,
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const userResult = await this.userService.getByUsername(username);
        if (userResult.hasFailed()) {
            return undefined;
        }
        const user = userResult.getData();
        if (user && (await bcrypt.compare(pass, user.password))) {
            const { password, ...result } = user;
            return result;
        }

        return undefined;
    }

    async login(username: string) {
        const user = await this.userService.getByUsername(username);

        if (user.hasFailed()) {
            throw new UnauthorizedException();
        }
        const payload = {
            username: user.getData().username,
            userId: user.getData().id,
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async verify(token: string): Promise<Result<User>> {
        try {
            const decode = this.jwtService.verify(token);
            const userResult = await this.userService.getUser(decode.userId);
            if (userResult.hasFailed()) {
                throw new UnauthorizedException(userResult.getError().getDescription());
            }
            this.requestService.setUser(userResult.getData());
            this.requestService.setUserToken(token);

            return userResult;
        } catch (e: any) {
            return Result.failed(
                new ErrorResponse(500, 'Error in verify token auth service'),
            );
        }
    }
}
