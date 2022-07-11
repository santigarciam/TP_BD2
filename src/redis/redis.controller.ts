import { Body, Controller, Get, HttpCode, HttpException, Inject, Param, Post, Redirect } from "@nestjs/common";
import { NewShortLinkDto } from "./newShortLink.dto";
import { RedisService } from "./redis.service";

@Controller('redis')
export class RedisController {

    @Inject(RedisService)
    private readonly redisService: RedisService;

    @Post('/create')
    @HttpCode(204)
    public async testKeyValue(@Body() body: NewShortLinkDto) {
        let succesfull = await this.redisService.createUrlKeyValue(body.short_url, body.long_url);
        if (succesfull) {
            return;
        } else {
            throw new HttpException(
                "Short URL unavailable :(",
                409,
            );
        }

    }

    @Get('/goto/:hash')
    @Redirect()
    public async testGetByHash(@Param('hash') hash: string) {
        let longUrl: string = await this.redisService.getUrlByHash(hash);
        if (longUrl) {
            return { url: longUrl };
        } else {
            throw new HttpException(
                "Short URL not found :(",
                404,
            );
        }
    }

}