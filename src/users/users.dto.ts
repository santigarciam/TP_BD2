import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    public username: string;

    @IsEmail()
    @IsNotEmpty()
    public email: string;

    @IsString()
    @IsNotEmpty()
    public password: string;
    // TODO: ver de agregar validaciones para: 6 or more characters, One number, One letter, One special character

}

export class ChangeUsernameDto {

    @IsString()
    @IsNotEmpty()
    public new_username: string;

}

export class ChangePasswordDto {

    @IsString()
    @IsNotEmpty()
    public new_password: string;

    @IsString()
    @IsNotEmpty()
    public confirm_password: string;

}
