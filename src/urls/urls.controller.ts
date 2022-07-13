import {
  Controller,
  Delete,
  HttpCode,
  HttpException,
  Inject,
  Param,
  Put,
} from '@nestjs/common';
import { Post, Get, Body } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { RedisService } from 'src/redis/redis.service';
import { RequestService } from 'src/request/request.service';
import { updateUrlDto } from './updateUrl.dto';
import { urlDto } from './urls.dto';
import { Url_entity, UserUrl } from './urls.schema';
import { UserUrlService } from './urls.service';

@ApiSecurity('basic')
@ApiTags('urls')
@Controller('urls')
export class UrlsController {
  @Inject(UserUrlService)
  private userUrlService: UserUrlService;

  @Inject(RequestService)
  private requestService: RequestService;

  @Inject(RedisService)
  private redisService: RedisService;

  @ApiOperation({ summary: 'Create user URL' })
  @ApiResponse({
    status: 200,
    description: 'The created user urls',
    type: UserUrl,
  })
  @Post()
  public async createUrl(@Body() body: urlDto): Promise<UserUrl> {
    try {
      if (await this.redisService.shortUrlExist(body.short_link)) {
        throw 'Short URL unavailable :(';
      }

      const userId = this.requestService.getUser().id;

      const isAvailable = await this.redisService.createUrlKeyValue(
        body.short_link,
        body.long_link,
      );

      if (isAvailable) {
        return this.userUrlService.addUrlToUser(userId, body);
      } else {
        throw 'Short URL unavailable :(';
      }
    } catch (err: any) {
      throw new HttpException(err, 409);
    }
  }

  @ApiOperation({ summary: 'Get short link total clicks ' })
  @ApiResponse({
    status: 200,
    description: 'The number of clicks',
    type: UserUrl,
  })
  //////////////////////////////////// TODO: ver si queda
  @Get('/:short_link/clicks')
  public async getLinkClicks(
    @Param('short_link') short_link: string,
  ): Promise<number> {
    return await this.redisService.getUrlClicks(short_link);
  }
  ////////////////////////////////////

  @ApiOperation({ summary: 'Update short link information' })
  @ApiResponse({
    status: 200,
    description: 'The updated url',
    type: UserUrl,
  })
  @Put('/:short_link')
  public async updateUrl(
    @Param('short_link') short_link: string,
    @Body() body: updateUrlDto,
  ): Promise<UserUrl> {
    try {
      const userId = this.requestService.getUser().id;
      const url = await this.getUserUrlById(short_link);

      if (url) {
        let updatedRedis = await this.redisService.updateUrlKeyValue(
          short_link,
          body.long_link,
        );

        if (updatedRedis) {
          return this.userUrlService.updateUrl(userId, body, url);
        } else {
          throw 'An was encountered trying to update the link, please try again later';
        }
      }
    } catch (err: any) {
      throw new HttpException(err, 409);
    }
  }

  @ApiOperation({ summary: 'List user URLs' })
  @ApiResponse({
    status: 200,
    description: 'The list of the urls for the user',
    type: UserUrl,
  })
  @Get()
  public async getUserUrls(): Promise<UserUrl> {
    const userId = this.requestService.getUser().id;
    return this.userUrlService.getUserUrlsById(userId);
  }

  @ApiOperation({ summary: 'Get short link information' })
  @ApiResponse({
    status: 200,
    description: 'The metadata saved for the given short link',
    type: UserUrl,
  })
  @Get('/:short_link')
  public async getUserUrlById(@Param('short_link') short_link: string) {
    const userId = this.requestService.getUser().id;
    const userUrls = await this.userUrlService.getUserUrlsById(userId);
    if (userUrls) {
      const url = userUrls.urls.find(
        (element) => element.short_link == short_link,
      );
      if (url) {
        return url;
      }
      throw new HttpException('Short link not found :(', 404);
    }
  }

  @ApiOperation({ summary: 'Delete short link' })
  @ApiResponse({
    status: 200,
    type: UserUrl,
  })
  @Delete('/:short_link')
  public async deleteUrlById(@Param('short_link') short_link: string) {
    const userId = this.requestService.getUser().id;
    const deleted = await this.userUrlService.deleteUrlFromUser(
      userId,
      short_link,
    );
    if (deleted) {
      this.redisService.deleteKeyValue(short_link);
    }
  }
}
