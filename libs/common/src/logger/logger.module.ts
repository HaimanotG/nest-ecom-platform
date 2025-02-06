import { Module, Global, DynamicModule } from '@nestjs/common';
import { ElasticsearchLogger } from './elasticsearch.logger';

@Global()
@Module({})
export class LoggerModule {
  static forRoot(serviceName: string): DynamicModule {
    return {
      module: LoggerModule,
      providers: [
        {
          provide: 'SERVICE_NAME',
          useValue: serviceName,
        },
        {
          provide: 'Logger',
          useFactory: () => new ElasticsearchLogger(),
          inject: ['SERVICE_NAME'],
        },
      ],
      exports: ['Logger'],
    };
  }
}
