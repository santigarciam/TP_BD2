import {
  Controller,
  Get,
  HttpException,
  Inject,
  Param,
  Redirect,
  SetMetadata,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RedisService } from './redis/redis.service';

export const Public = () => SetMetadata('isPublic', true);

@Controller('/goto')
export class AppController {
  @Inject(RedisService)
  private readonly redisService: RedisService;

  @ApiOperation({ summary: 'Get the long link redirection ' })
  @ApiResponse({
    status: 302,
    description: 'Redirection to the long link',
  })
  @Public()
  @Get('/:hash')
  @Redirect()
  public async redirection(@Param('hash') hash: string) {
    let longUrl: string = await this.redisService.getUrlByHash(hash);
    if (longUrl) {
      return { url: longUrl };
    } else {
      throw new HttpException('Short URL not found :(', 404);
    }
  }
}
