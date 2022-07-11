import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { RedisService } from "./redis.service";

interface ShortUrl {
    shortUrl: string;
    longUrl: string;
}

@Controller('redis')
export class RedisController {

    @Inject(RedisService)
    private readonly redisService: RedisService;

    @Post('/testObject')
    public async testObject(@Body() body: any): Promise<ShortUrl> {
        return await this.redisService.createUrlObject("prueba", "www.google.com");
    }

    @Post('/testKeyValue')
    public async testKeyValue(@Body() body: any) {
        await this.redisService.createUrlKeyValue("prueba", "www.google.com");
    }

    @Get('/getTextSearch')
    public async testGetFullTextSearch(): Promise<ShortUrl[]> {
        return await this.redisService.getUrlByText("prueba");
    }

    @Get('/getByHash')
    public async testGetByHash(): Promise<string> {
        return await this.redisService.getUrlByHash("prueba");
    }

}