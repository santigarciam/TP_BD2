import {
  Controller,
  Delete,
  HttpCode,
  Inject,
  Param,
  Put,
} from '@nestjs/common';
import { Post, Get, Body } from '@nestjs/common';
import { RequestService } from 'src/request/request.service';
import { updateUrlDto } from './updateUrl.dto';
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
    // TODO: Agregar chequeo con redis si ese short_link ya existe
    const userId = this.requestService.getUser().id;

    return this.userUrlService.addUrlToUser(userId, body);
  }

  @Put('/:short_link')
  public async updateUrl(
    @Param('short_link') short_link: string,
    @Body() body: updateUrlDto,
  ): Promise<UserUrl> {
    const userId = this.requestService.getUser().id;
    const url = await this.getUserUrlById(short_link);
    if (url) {
      return this.userUrlService.updateUrl(userId, body, url);
    }
  }
  @Get()
  public async getUserUrls(): Promise<UserUrl> {
    const userId = this.requestService.getUser().id;
    return this.userUrlService.getUserUrlsById(userId);
  }

  // TODO: Meter logica de aumentar los clicks pero usando redis!
  @Get('/:short_link')
  public async getUserUrlById(@Param('short_link') short_link: string) {
    const userId = this.requestService.getUser().id;
    const userUrls = await this.userUrlService.getUserUrlsById(userId);
    if (userUrls) {
      const url = userUrls.urls.find(
        (element) => element.short_link == short_link,
      );
      return url;
    }
  }

  @Delete('/:short_link')
  public async deleteUrlById(@Param('short_link') short_link: string) {
    const userId = this.requestService.getUser().id;
    this.userUrlService.deleteUrlFromUser(userId, short_link);
  }
}
