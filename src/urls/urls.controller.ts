import { Controller, Inject } from '@nestjs/common';
import { Post, Get, ParseIntPipe, Body } from '@nestjs/common';
import { urlDto } from './urls.dto';
import { Url_entity, UserUrl } from './urls.schema';
import { UserUrlService } from './urls.service';

@Controller('urls')
export class UrlsController {
  @Inject(UserUrlService)
  private userUrlService: UserUrlService;

  @Post()
  public async createUrl(@Body() body: urlDto): Promise<UserUrl> {
    const userId = 1;

    return this.userUrlService.addUrlToUser(userId, body);
  }

  @Get()
  public async getUserUrls(): Promise<UserUrl[]> {
    const userId = 1;
    return this.userUrlService.getUserUrls(userId);
  }
}
