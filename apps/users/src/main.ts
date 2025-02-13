import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';

async function bootstrap() {
  const app = await NestFactory.create(UsersModule, {
    logger: ['error', 'warn'],
  });

  await app.listen(parseInt(process.env.PORT ?? '3001'), '0.0.0.0', () => {
    console.log(`Application is running on port ${process.env.PORT ?? '3001'}`);
  });
}
bootstrap();
