import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { RequestModule } from '../request/request.module';
import { UsersController } from "./users.controller";
import { User } from "./users.entity";
import { UsersService } from './users.service';


@Module({
    imports: [TypeOrmModule.forFeature([User]), RequestModule],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule { }