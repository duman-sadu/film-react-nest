import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  private stringify(value: any): string {
    if (value === undefined) return '';
    if (typeof value === 'string') return value;
    return JSON.stringify(value);
  }

  private format(level: string, message: any, optionalParams: any[]) {
    const parts: string[] = [];

    parts.push(`level=${level}`);
    parts.push(`message=${this.stringify(message)}`);

    if (optionalParams?.length) {
      parts.push(`params=${this.stringify(optionalParams)}`);
    }

    parts.push(`time=${new Date().toISOString()}`);

    return parts.join('\t') + '\n';
  }

  log(message: any, ...optionalParams: any[]) {
    process.stdout.write(this.format('log', message, optionalParams));
  }

  error(message: any, ...optionalParams: any[]) {
    process.stderr.write(this.format('error', message, optionalParams));
  }

  warn(message: any, ...optionalParams: any[]) {
    process.stdout.write(this.format('warn', message, optionalParams));
  }

  debug(message: any, ...optionalParams: any[]) {
    process.stdout.write(this.format('debug', message, optionalParams));
  }

  verbose(message: any, ...optionalParams: any[]) {
    process.stdout.write(this.format('verbose', message, optionalParams));
  }
}
