import { Controller, Get, HttpException, Inject, Param, Redirect } from "@nestjs/common";
import { RedisService } from "./redis/redis.service";

@Controller('/goto')
export class AppController {

    @Inject(RedisService)
    private readonly redisService: RedisService;

    @Get('/:hash')
    @Redirect()
    public async redirection(@Param('hash') hash: string) {
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