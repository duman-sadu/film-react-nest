import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class JsonLogger implements LoggerService {
  private format(level: string, message: any, optionalParams: any[]) {
    return JSON.stringify({
      level,
      message,
      optionalParams,
      timestamp: new Date().toISOString(),
    });
  }

  log(message: any, ...optionalParams: any[]) {
    console.log(this.format('log', message, optionalParams));
  }

  error(message: any, ...optionalParams: any[]) {
    console.error(this.format('error', message, optionalParams));
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn(this.format('warn', message, optionalParams));
  }

  debug(message: any, ...optionalParams: any[]) {
    console.debug(this.format('debug', message, optionalParams));
  }

  verbose(message: any, ...optionalParams: any[]) {
    console.info(this.format('verbose', message, optionalParams));
  }
}
