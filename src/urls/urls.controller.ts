import { Controller, Inject } from '@nestjs/common';
import { Post, Param, ParseIntPipe, Body } from '@nestjs/common';
import { urlDto } from './urls.dto';
import { Url_entity } from './urls.schema';
import { UrlsService } from './urls.service';

@Controller('urls')
export class UrlsController {
  @Inject(UrlsService)
  private urlService: UrlsService;

  @Post()
  public async createUrl(@Body() body: urlDto): Promise<string> {
    console.log('exx');
    const urlAux = new Url_entity();
    urlAux.clicks = 0;
    urlAux.long_link = body.long_link;
    urlAux.short_link = body.short_link;
    urlAux.title = body.title;
    return this.urlService.create(body);
  }
}
