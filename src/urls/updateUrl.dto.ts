import { IsArray, IsString } from 'class-validator';

export class updateUrlDto {
  @IsString()
  public long_link: string;

  @IsString()
  public title: string;

  @IsArray()
  public tags: Array<string>;
  //TODO: completar con el resto de atributos
}
