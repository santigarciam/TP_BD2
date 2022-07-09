import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./users.dto";
import { User } from "./users.entity";

@Injectable()
export class UsersService {

    @InjectRepository(User)
    private readonly repository: Repository<User>;

    public async createUser(body: CreateUserDto): Promise<User> {

        try {

            // let presentUsername = await this.repository.findOne({ username: body.username });
            // let presentEmail = await this.repository.findOne({ email: body.email });

            // if (presentUsername) {
            //     throw "Username already in use"
            // }

            // if (presentEmail) {
            //     throw "Email already in use"
            // }

            const user: User = new User(
                body.name,
                body.email,
                body.password,
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