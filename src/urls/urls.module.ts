import { Module } from '@nestjs/common';
import { UrlsController } from './urls.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserUrlSchema, UserUrl } from './urls.schema';
import { UserUrlRepository } from './urls.repository';
import { UserUrlService } from './urls.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserUrl.name, schema: UserUrlSchema }]),
  ],
  controllers: [UrlsController],
  providers: [UserUrlService, UserUrlRepository],
  exports: [UserUrlService],
})
export class UrlsModule {}
