import { Module } from '@nestjs/common';
import { RequestService } from '../request/request.service';

@Module({
    imports: [],
    providers: [RequestService],
    exports: [RequestService],
})
export class RequestModule { }
