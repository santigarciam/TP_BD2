import { Module, RequestMapping } from '@nestjs/common';
import { UrlsController } from './urls.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserUrlSchema, UserUrl } from './urls.schema';
import { UserUrlRepository } from './urls.repository';
import { UserUrlService } from './urls.service';
import { RequestModule } from 'src/request/request.module';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserUrl.name, schema: UserUrlSchema }]),
    RequestModule,
    RedisModule,
  ],
  controllers: [UrlsController],
  providers: [UserUrlService, UserUrlRepository],
  exports: [UserUrlService],
})
export class UrlsModule {}
