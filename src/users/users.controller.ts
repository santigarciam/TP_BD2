import { Body, Controller, Inject, Post } from "@nestjs/common";
import { CreateUserDto } from "./users.dto";
import { User } from "./users.entity";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {

    @Inject(UsersService)
    private readonly service: UsersService;

    @Post()
    public async createUser(@Body() body: CreateUserDto): Promise<User> {

        let newUserResult = await this.service.createUser(body);

        return newUserResult;
    }

}