import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter, Histogram } from 'prom-client';

@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  constructor(
    @InjectMetric('http_requests_total')
    private readonly requestCounter: Counter<string>,
    @InjectMetric('http_request_duration_seconds')
    private readonly requestDuration: Histogram<string>,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const start = Date.now();

    return next.handle().pipe(
      tap({
        next: () => {
          const duration = Date.now() - start;
          this.requestCounter.inc({
            method: req.method,
            status: context.switchToHttp().getResponse().statusCode,
            path: req.route?.path || 'unknown',
          });
          this.requestDuration.observe(
            {
              method: req.method,
              status: context.switchToHttp().getResponse().statusCode,
              path: req.route?.path || 'unknown',
            },
            duration / 1000,
          );
        },
      }),
    );
  }
}
