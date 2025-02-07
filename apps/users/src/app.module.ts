import { Module } from '@nestjs/common';
import { HealthModule } from '../../../libs/common/src/health/health.module';
import { metricProviders } from '../../../libs/common/src/metrics/metrics.provider';

@Module({
  imports: [HealthModule],
  providers: [...metricProviders],
})
export class AppModule {}
