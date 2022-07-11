import { IsNumber, IsString } from 'class-validator';

export class urlDto {
  @IsString()
  public short_link: string;

  @IsString()
  public long_link: string;

  @IsString()
  public title: string;
  //TODO: completar con el resto de atributos
}
