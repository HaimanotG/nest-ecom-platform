import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { LoggerModule } from './logger/logger.module';
import { MetricsModule } from './metrics/metrics.module';

@Module({
  imports: [HealthModule, LoggerModule, MetricsModule],
  exports: [HealthModule, LoggerModule, MetricsModule],
})
export class CommonModule {}
