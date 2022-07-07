import { Module } from '@nestjs/common';
import { UrlsController } from './urls.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlSchema, userUrl } from './urls.schema';
import { UrlsService } from './urls.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: userUrl.name, schema: UrlSchema }]),
  ],
  controllers: [UrlsController],
  providers: [UrlsService],
})
export class UrlsModule {}
