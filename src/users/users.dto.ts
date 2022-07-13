import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John', description: 'name of user created' })
  @IsString()
  @IsNotEmpty()
  public username: string;

  @ApiProperty({
    example: 'john.doe@email.com',
    description: 'email of user created',
  })
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @ApiProperty({ example: 'Password1', description: 'password for user' })
  @IsString()
  @IsNotEmpty()
  public password: string;
  // TODO: ver de agregar validaciones para: 6 or more characters, One number, One letter, One special character
}

export class ChangeUsernameDto {
  @ApiProperty({ example: 'John', description: 'name of user updated' })
  @IsString()
  @IsNotEmpty()
  public new_username: string;
}

export class ChangePasswordDto {
  @ApiProperty({ example: 'password', description: 'the new password' })
  @IsString()
  @IsNotEmpty()
  public new_password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'password',
    description: 'new password confirmation',
  })
  public confirm_password: string;
}
