import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    @InjectMetric('http_requests_total')
    private readonly requestCounter: Counter<string>,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    this.requestCounter.inc();
    return this.health.check([]);
  }
}
