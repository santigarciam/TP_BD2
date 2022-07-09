import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    public name: string;

    @IsEmail()
    public email: string;

    @IsString()
    public username: string;

    @IsString()
    public password: string;

    @IsString()
    public surname: string;

}
