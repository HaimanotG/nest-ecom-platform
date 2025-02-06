import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as sanitizeHtml from 'sanitize-html';

@Injectable()
export class SanitizeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    this.sanitizeRequest(request.body);

    return next.handle().pipe(map((data) => this.sanitizeResponse(data)));
  }

  private sanitizeRequest(data: any): void {
    if (!data) return;

    Object.keys(data).forEach((key) => {
      if (typeof data[key] === 'string') {
        data[key] = sanitizeHtml(data[key]);
      } else if (typeof data[key] === 'object') {
        this.sanitizeRequest(data[key]);
      }
    });
  }

  private sanitizeResponse(data: any): any {
    if (!data) return data;

    if (Array.isArray(data)) {
      return data.map((item) => this.sanitizeResponse(item));
    }

    if (typeof data === 'object') {
      const sanitized = {};
      Object.keys(data).forEach((key) => {
        sanitized[key] = this.sanitizeResponse(data[key]);
      });
      return sanitized;
    }

    if (typeof data === 'string') {
      return sanitizeHtml(data);
    }

    return data;
  }
}
