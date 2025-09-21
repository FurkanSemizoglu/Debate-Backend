import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    } else if (exception.code === 'P2002') {
      status = HttpStatus.CONFLICT;
      message = 'A record with this data already exists';
    } else if (exception.code === 'P2025') {
      // Prisma record not found error
      status = HttpStatus.NOT_FOUND;
      message = 'Record not found';
    } else if (exception.code && exception.code.startsWith('P')) {
      // Other Prisma errors
      status = HttpStatus.BAD_REQUEST;
      message = 'Database operation failed';
    }

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message,
      error: this.getErrorName(status),
    };

    // Log the error with different levels based on status
    if (status >= 500) {
      this.logger.error(
        `Server Error: ${status} - ${message}`,
        exception.stack || exception,
      );
    } else {
      this.logger.warn(`Client Error: ${status} - ${message}`);
    }

    response.status(status).json(errorResponse);
  }

  private getErrorName(status: number): string {
    switch (status) {
      case HttpStatus.BAD_REQUEST:
        return 'Bad Request';
      case HttpStatus.UNAUTHORIZED:
        return 'Unauthorized';
      case HttpStatus.FORBIDDEN:
        return 'Forbidden';
      case HttpStatus.NOT_FOUND:
        return 'Not Found';
      case HttpStatus.CONFLICT:
        return 'Conflict';
      case HttpStatus.INTERNAL_SERVER_ERROR:
        return 'Internal Server Error';
      default:
        return 'Error';
    }
  }
}