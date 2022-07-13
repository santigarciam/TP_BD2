import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class updateUrlDto {
  @ApiProperty({
    example: 'http:/www.google.com',
    description: 'The long link',
  })
  @IsString()
  public long_link: string;

  @ApiProperty({
    example: 'My new title',
    description: 'The new title',
  })
  @IsString()
  public title: string;

  @ApiProperty({
    example: "['Education','School']",
    description: 'The tags',
  })
  @IsArray()
  public tags: Array<string>;
  //TODO: completar con el resto de atributos
}
