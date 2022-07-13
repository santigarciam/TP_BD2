import {
  Body,
  Controller,
  HttpException,
  Inject,
  Post,
  Put,
  SetMetadata,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { UserUrlService } from 'src/urls/urls.service';
import { RequestService } from '../request/request.service';
import {
  ChangePasswordDto,
  ChangeUsernameDto,
  CreateUserDto,
} from './users.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';

export const Public = () => SetMetadata('isPublic', true);

@ApiTags('users')
@Controller('users')
export class UsersController {
  @Inject(UsersService)
  private readonly service: UsersService;

  @Inject(RequestService)
  private readonly requestService: RequestService;

  @Inject(UserUrlService)
  private readonly userUrlService: UserUrlService;

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 200,
    description: 'The created user',
    type: User,
  })
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

    this.userUrlService.createUserUrl(newUserResult.getData().id);

    return newUserResult.getData();
  }

  @ApiSecurity('basic')
  @ApiOperation({ summary: 'Update username' })
  @ApiResponse({
    status: 201,
    description: 'The updated user',
    type: User,
  })
  @Put()
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

  @ApiSecurity('basic')
  @ApiOperation({ summary: 'Update user password' })
  @ApiResponse({
    status: 200,
    description: 'The updated user',
    type: User,
  })
  @Post('/password')
  public async changePassword(@Body() body: ChangePasswordDto): Promise<User> {
    if (!(body.new_password === body.confirm_password)) {
      throw new HttpException('Passwords do not match', 400);
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
