import { Module } from '@nestjs/common';
import { LoggerModule, MetricsModule, HealthModule } from '@app/common';

@Module({
  imports: [
    LoggerModule.forRoot('users-service'),
    MetricsModule,
    HealthModule.forRoot([
      // Add service-specific health checks here
    ]),
  ],
})
export class UsersModule {}
