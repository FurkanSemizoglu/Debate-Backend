import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerService } from '../services/logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const { method, url, body, query, headers } = request;
    const userAgent = headers['user-agent'] || '';
    const ip = request.ip || request.connection.remoteAddress;
    
    const startTime = Date.now();
    const requestId = Math.random().toString(36).substring(7);

    this.logger.log('Incoming Request', {
      requestId,
      method,
      url,
      ip,
      userAgent,
      body: this.sanitizeBody(body),
      query,
    });

    return next.handle().pipe(
      tap({
        next: (responseBody) => {
          const duration = Date.now() - startTime;
          this.logger.log('Request Completed', {
            requestId,
            method,
            url,
            statusCode: response.statusCode,
            duration: `${duration}ms`,
            responseSize: JSON.stringify(responseBody).length,
          });
        },
        error: (error) => {
          const duration = Date.now() - startTime;
          this.logger.error('Request Failed', error.stack, {
            requestId,
            method,
            url,
            duration: `${duration}ms`,
            error: error.message,
          });
        },
      })
    );
  }

  private sanitizeBody(body: any): any {
    if (!body) return body;
    
    const sanitized = { ...body };
    const sensitiveFields = ['password', 'token', 'authorization', 'secret'];
    
    sensitiveFields.forEach(field => {
      if (sanitized[field]) {
        sanitized[field] = '[REDACTED]';
      }
    });
    
    return sanitized;
  }
}