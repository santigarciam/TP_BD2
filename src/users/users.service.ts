import { HttpException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ChangePasswordDto, ChangeUsernameDto, CreateUserDto } from "./users.dto";
import { User } from "./users.entity";
import * as bcrypt from 'bcrypt';
import Result from "../Result";
import ErrorResponse from "../ErrorResponse";

@Injectable()
export class UsersService {

    @InjectRepository(User)
    private readonly repository: Repository<User>;

    public async createUser(body: CreateUserDto): Promise<Result<User>> {

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
                body.username,
                body.email,
                await bcrypt.hash(body.password, genSalt),
            );

            let userDB = await this.repository.save(user);
            return Result.ok(userDB as User);

        } catch (err: any) {

            return Result.failed(new ErrorResponse(409, err));

        }

    }

    public async getUser(id: number): Promise<Result<User>> {
        try {
            let user = await this.repository.findOne({ where: { id: id } });

            if (!user) {
                throw "User not found";
            }

            return Result.ok(user as User);
        } catch (err: any) {
            return Result.failed(new ErrorResponse(404, err));
        }
    }

    public async getByUsername(
        username: string,
    ): Promise<Result<User | undefined>> {
        try {
            let user = await this.repository.findOne({ where: { username: username } });

            if (!user) {
                throw "User not found";
            }

            return Result.ok(user as User);
        } catch (err: any) {
            return Result.failed(new ErrorResponse(404, err));
        }
    }

    public async changeUsername(user: User, body: ChangeUsernameDto): Promise<Result<User>> {

        try {

            let presentUsername = await this.repository.findOne({ where: { username: body.new_username } });

            if (presentUsername) {
                throw "Username already in use"
            }

            user.username = body.new_username;
            await this.repository.save(user);

            return Result.ok(user as User);

        } catch (err: any) {

            return Result.failed(new ErrorResponse(409, err));

        }
    }

    public async changePassword(user: User, body: ChangePasswordDto): Promise<Result<User>> {

        try {

            let genSalt = await bcrypt.genSalt();

            user.password = await bcrypt.hash(body.new_password, genSalt);
            await this.repository.save(user);

            return Result.ok(user as User);

        } catch (err: any) {

            return Result.failed(new ErrorResponse(409, err));

        }
    }

}