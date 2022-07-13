import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUrl } from 'class-validator';

export class urlDto {
  @ApiProperty({
    example: 'myShortUrl',
    description: 'The short URL',
  })
  @IsString()
  public short_link: string;

  @ApiProperty({
    example: 'http:/www.google.com',
    description: 'The long link',
  })
  @IsUrl({
    require_protocol: true,
    require_valid_protocol: true,
  })
  @IsString()
  public long_link: string;

  @ApiProperty({
    example: 'My google short link',
    description: 'Title of the short link',
  })
  @IsString()
  public title: string;
  //TODO: completar con el resto de atributos
}
