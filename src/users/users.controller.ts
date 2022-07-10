import { Body, Controller, HttpException, Inject, Post, SetMetadata } from "@nestjs/common";
import { AuthService } from "../auth/auth.service";
import { RequestService } from "../request/request.service";
import { ChangePasswordDto, ChangeUsernameDto, CreateUserDto } from "./users.dto";
import { User } from "./users.entity";
import { UsersService } from "./users.service";

export const Public = () => SetMetadata('isPublic', true);

@Controller('users')
export class UsersController {

    @Inject(UsersService)
    private readonly service: UsersService;

    @Inject(RequestService)
    private readonly requestService: RequestService;

    @Post()
    @Public()
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

    @Post('/edit')
    public async changeUsername(@Body() body: ChangeUsernameDto): Promise<User> {

        let user: User = this.requestService.getUser();

        let updatedUserResult = await this.service.changeUsername(user, body);

        if (updatedUserResult.hasFailed()) {
            throw new HttpException(
                updatedUserResult.getError().getDescription(),
                updatedUserResult.getError().getCode(),
            );
        }

        return updatedUserResult.getData();
    }

    @Post('/password')
    public async changePassword(@Body() body: ChangePasswordDto): Promise<User> {

        if (!(body.new_password === body.confirm_password)) {
            throw new HttpException(
                "Passwords do not match",
                400,
            );
        }

        let user: User = this.requestService.getUser();

        let updatedUserResult = await this.service.changePassword(user, body);

        if (updatedUserResult.hasFailed()) {
            throw new HttpException(
                updatedUserResult.getError().getDescription(),
                updatedUserResult.getError().getCode(),
            );
        }

        return updatedUserResult.getData();
    }

}