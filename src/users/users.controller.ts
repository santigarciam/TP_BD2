import { Body, Controller, HttpException, Inject, Post } from "@nestjs/common";
import { ChangeUsernameDto, CreateUserDto } from "./users.dto";
import { User } from "./users.entity";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {

    @Inject(UsersService)
    private readonly service: UsersService;

    @Post()
    public async createUser(@Body() body: CreateUserDto): Promise<User> {

        let newUserResult = await this.service.createUser(body);

        if (newUserResult.hasFailed()) {
            throw new HttpException(
                newUserResult.getError().getDescription(),
                newUserResult.getError().getCode(),
            );
        }

        return newUserResult.getData();
    }

    // @Post()
    // public async changeUsername(@Body() body: ChangeUsernameDto): Promise<User> {

    //     // TODO: agregar user como parametro
    //     let updatedUserResult = await this.service.changeUsername(body);

    //     if (updatedUserResult.hasFailed()) {
    //         throw new HttpException(
    //             updatedUserResult.getError().getDescription(),
    //             updatedUserResult.getError().getCode(),
    //         );
    //     }

    //     return updatedUserResult.getData();
    // }

}