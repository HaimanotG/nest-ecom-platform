import { Module, Global } from '@nestjs/common';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { metricProviders } from './metrics.provider';
import { MetricsInterceptor } from './metrics.interceptor';

@Global()
@Module({
  imports: [PrometheusModule.register()],
  providers: [...metricProviders, MetricsInterceptor],
  exports: [PrometheusModule, MetricsInterceptor],
})
export class MetricsModule {}
