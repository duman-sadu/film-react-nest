import { ConfigModule, ConfigService } from '@nestjs/config';

export const configProvider = {
  imports: [ConfigModule.forRoot()],
  inject: [ConfigService],
  provide: 'CONFIG',
  useFactory: (config: ConfigService) => {
    return {
      database: {
        driver: config.get('DATABASE_DRIVER') ?? 'memory',
        url: config.get('DATABASE_URL') ?? '',
      },
    };
  },
};

export interface AppConfig {
  database: AppConfigDatabase;
}

export interface AppConfigDatabase {
  driver: string;
  url: string;
}
