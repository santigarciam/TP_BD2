import {
    CallHandler,
    ExecutionContext,
    Injectable,
    Logger,
    NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { RequestService } from '../request/request.service';

@Injectable()
export class LogginInterceptor implements NestInterceptor {
    private readonly logger = new Logger(LogginInterceptor.name);

    constructor(private readonly requestService: RequestService) { }

    intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
        const req = context.switchToHttp().getRequest();
        const userAgent = req.get('user-agent') || '';
        const { ip, method, path: url } = req;

        this.logger.log(
            `${method} ${url} ${userAgent} ${ip} ${context.getClass().name}`,
        );
        if (this.requestService.getUser()) {
            this.logger.debug('user: ', this.requestService.getUser().username);
        }

        return next.handle().pipe(
            tap((res) => {
                const response = context.switchToHttp().getResponse();

                const { statusCode } = response;
                if (this.requestService.getUserToken()) {
                    response.setHeader(
                        'Authorization',
                        'Bearer ' + this.requestService.getUserToken(),
                    );
                }

                return response;
            }),
        );
    }
}
