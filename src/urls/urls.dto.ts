import { IsNumber, IsString, IsUrl } from 'class-validator';

export class urlDto {
  @IsString()
  public short_link: string;

  @IsUrl({
    require_protocol: true,
    require_valid_protocol: true,
  })
  @IsString()
  public long_link: string;

  @IsString()
  public title: string;
  //TODO: completar con el resto de atributos
}
