import { Injectable } from '@nestjs/common';
import { HealthCheckService } from '@nestjs/terminus';
import { Counter } from 'prom-client';
import { InjectMetric } from '@willsoto/nestjs-prometheus';

@Injectable()
export class HealthService {
  constructor(
    private health: HealthCheckService,
    @InjectMetric('http_requests_total')
    private readonly requestCounter: Counter<string>,
  ) {}

  async check() {
    this.requestCounter.inc();
    return this.health.check([]);
  }
}
