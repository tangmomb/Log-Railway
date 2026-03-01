import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ShippingService {
  constructor(private configService: ConfigService) {}

  logWebhook(headers: any, rawBody: string, parsedBody: any) {
    const secret = this.configService.get<string>('SENDCLOUD_WEBHOOK_SECRET');
    
    console.log('--- HEADERS ---');
    console.log(JSON.stringify(headers, null, 2));

    console.log('--- DIAGNOSTIC ---');
    console.log('Secret present:', !!secret);
    console.log('Raw body length:', rawBody ? rawBody.length : 0);

    console.log('--- RAW BODY ---');
    console.log(rawBody || '(EMPTY)');
    
    console.log('--- PARSED BODY ---');
    console.log(JSON.stringify(parsedBody, null, 2));
    
    console.log('----------------');
  }
}
