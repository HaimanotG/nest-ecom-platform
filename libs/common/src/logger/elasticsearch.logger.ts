import { Injectable, LoggerService } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';

@Injectable()
export class ElasticsearchLogger implements LoggerService {
  private readonly client: Client;

  constructor() {
    this.client = new Client({ node: 'http://elasticsearch:9200' });
  }

  async log(message: string, context?: string) {
    await this.saveLog('info', message, context);
  }

  async error(message: string, trace?: string, context?: string) {
    await this.saveLog('error', message, context, trace);
  }

  async warn(message: string, context?: string) {
    await this.saveLog('warn', message, context);
  }

  private async saveLog(
    level: string,
    message: string,
    context?: string,
    trace?: string,
  ) {
    try {
      await this.client.index({
        index: 'nestjs-logs',
        document: {
          '@timestamp': new Date(),
          level,
          message,
          context,
          trace,
          service: process.env.SERVICE_NAME || 'unknown',
        },
      });
    } catch (error) {
      console.error('Failed to save log to Elasticsearch:', error);
    }
  }
}
