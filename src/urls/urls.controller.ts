import { Controller, Inject, Param } from '@nestjs/common';
import { Post, Get, Body } from '@nestjs/common';
import { RequestService } from 'src/request/request.service';
import { urlDto } from './urls.dto';
import { Url_entity, UserUrl } from './urls.schema';
import { UserUrlService } from './urls.service';

@Controller('urls')
export class UrlsController {
  @Inject(UserUrlService)
  private userUrlService: UserUrlService;

  @Inject(RequestService)
  private requestService: RequestService;

  @Post()
  public async createUrl(@Body() body: urlDto): Promise<UserUrl> {
    const userId = this.requestService.getUser().id;

    return this.userUrlService.addUrlToUser(userId, body);
  }

  @Get()
  public async getUserUrls(): Promise<UserUrl> {
    const userId = this.requestService.getUser().id;
    return this.userUrlService.getUserUrlsById(userId);
  }

  @Get('/:short_link')
  public async getUserUrlById(@Param('short_link') short_link: string) {
    const userId = this.requestService.getUser().id;
    const userUrls = await this.userUrlService.getUserUrlsById(userId);

    const url = userUrls.urls.find(
      (element) => element.short_link == short_link,
    );
    return url;
  }
}
