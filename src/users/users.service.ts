import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./users.dto";
import { User } from "./users.entity";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    @InjectRepository(User)
    private readonly repository: Repository<User>;

    public async createUser(body: CreateUserDto): Promise<User> {

        try {

            let presentUsername = await this.repository.findOne({ where: { username: body.username } });
            let presentEmail = await this.repository.findOne({ where: { email: body.email } });

            if (presentUsername) {
                throw "Username already in use"
            }

            if (presentEmail) {
                throw "Email already in use"
            }

            let genSalt = await bcrypt.genSalt();

            const user: User = new User(
                body.name,
                body.email,
                await bcrypt.hash(body.password, genSalt),
                body.surname,
                body.username,
            );

            let userDB = await this.repository.save(user);
            return userDB;

        } catch (err: any) {

            return err;

        }

    }

}