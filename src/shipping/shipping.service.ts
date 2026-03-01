import { Injectable } from '@nestjs/common';

@Injectable()
export class ShippingService {
  logWebhook(headers: any, rawBody: string, parsedBody: any) {
    console.log('--- HEADERS ---');
    console.log(JSON.stringify(headers, null, 2));

    console.log('--- DIAGNOSTIC ---');
    console.log('Raw body length:', rawBody ? rawBody.length : 0);
    console.log('Raw body type:', typeof rawBody);
    console.log('Has rawBody property on request:', rawBody !== undefined);
    console.log('Parsed body present:', !!parsedBody);
    if (parsedBody) {
        console.log('Parsed body keys:', Object.keys(parsedBody));
    }

    console.log('--- RAW BODY (pure) ---');
    console.log(rawBody || '(EMPTY)');
    
    console.log('--- PARSED BODY (fallback) ---');
    console.log(JSON.stringify(parsedBody, null, 2));
    
    console.log('----------------');
  }
}
