import { Body, Controller, Get, Inject, Param, Post, Redirect, Res } from "@nestjs/common";
import { RedisService } from "./redis.service";

interface ShortUrl {
    shortUrl: string;
    longUrl: string;
}

@Controller('redis')
export class RedisController {

    @Inject(RedisService)
    private readonly redisService: RedisService;

    // @Post('/testObject')
    // public async testObject(@Body() body: any): Promise<ShortUrl> {
    //     return await this.redisService.createUrlObject("prueba", "www.google.com");
    // }

    @Post('/testKeyValue')
    public async testKeyValue(@Body() body: any) {
        await this.redisService.createUrlKeyValue("prueba", "https://www.google.com/");
    }

    // @Get('/getTextSearch')
    // public async testGetFullTextSearch(): Promise<ShortUrl[]> {
    //     return await this.redisService.getUrlByText("prueba");
    // }

    @Get('/goto/:hash')
    @Redirect()
    public async testGetByHash(@Param('hash') hash: string) {
        let longUrl: string = await this.redisService.getUrlByHash(hash);
        if (longUrl) {
            // OBS: para que ande bien, el longUrl tiene que ser de la forma: "http.....com"
            return { url: longUrl };
        }
    }

}