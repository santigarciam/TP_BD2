import { MiddlewareConsumer, Module, NestModule, Scope } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UrlsModule } from './urls/urls.module';
import { ConfigModule } from '@nestjs/config';
import { getEnvPath } from './common/helper/env.helper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './shared/typeorm/typeorm.service';
import { UsersModule } from './users/users.module';
import { AuthenticationMiddleWare } from './middleware/authentication.midleware';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LogginInterceptor } from './interceptors/loggin.interceptor';
import { AuthModule } from './auth/auth.module';
import { RequestModule } from './request/request.module';
import { RedisModule } from './redis/redis.module';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    RedisModule,
    UrlsModule,
    UsersModule,
    AuthModule,
    RequestModule,
    MongooseModule.forRoot('mongodb://localhost/nest')
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      scope: Scope.REQUEST,
      useClass: LogginInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleWare).forRoutes('*');
  }
}
