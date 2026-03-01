import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ShippingService {
  private readonly logger = new Logger(ShippingService.name);

  logWebhook(headers: any, rawBody: string, parsedBody: any) {
    const logEntry = {
      received_at: new Date().toISOString(),
      headers: headers,
      raw_body: rawBody,
      parsed_body: parsedBody,
    };

    // Console log the structured data as requested
    console.log(JSON.stringify(logEntry, null, 2));
  }
}
