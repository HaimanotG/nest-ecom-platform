import { Module, DynamicModule } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { HealthCheck } from './interfaces/health-check.interface';
import { makeCounterProvider } from '@willsoto/nestjs-prometheus';

@Module({})
export class HealthModule {
  static forRoot(checks: HealthCheck[] = []): DynamicModule {
    return {
      module: HealthModule,
      imports: [
        TerminusModule,
        PrometheusModule.register({
          defaultMetrics: {
            enabled: false,
          },
          defaultLabels: {
            service: process.env.SERVICE_NAME || 'unknown',
          },
        }),
      ],
      controllers: [HealthController],
      providers: [
        HealthService,
        makeCounterProvider({
          name: 'http_requests_total',
          help: 'Total number of HTTP requests',
          labelNames: ['method', 'status', 'path'],
        }),
        {
          provide: 'HEALTH_CHECKS',
          useValue: checks,
        },
      ],
      exports: [HealthService],
    };
  }
}
