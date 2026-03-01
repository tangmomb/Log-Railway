import { Injectable } from '@nestjs/common';

@Injectable()
export class ShippingService {
  logWebhook(headers: any, rawBody: string) {
    console.log('--- HEADERS ---');
    console.log(JSON.stringify(headers, null, 2));
    console.log('--- RAW BODY ---');
    console.log(rawBody);
    console.log('----------------');
  }
}
