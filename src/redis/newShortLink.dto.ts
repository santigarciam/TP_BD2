import { IsUrl, IsNotEmpty, IsString } from 'class-validator';

export class NewShortLinkDto {

    @IsString()
    @IsNotEmpty()
    public short_url: string;

    @IsUrl({
        require_protocol: true,
        require_valid_protocol: true
    })
    @IsNotEmpty()
    public long_url: string;

}