import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class ShippingService {
  constructor(private configService: ConfigService) {}

  /**
   * Silently verifies the signature. Returns false if secret, signature, or match is missing.
   */
  verifySignature(headers: any, rawBody: string): boolean {
    const secret = this.configService.get<string>('SENDCLOUD_WEBHOOK_SECRET');
    if (!secret) return false;

    const signature = headers['sendcloud-signature'] || headers['x-sendcloud-signature'];
    if (!signature) return false;

    const calculatedHash = crypto
      .createHmac('sha256', secret)
      .update(rawBody)
      .digest('hex');

    try {
      return crypto.timingSafeEqual(
        Buffer.from(calculatedHash, 'utf8'),
        Buffer.from(signature, 'utf8')
      );
    } catch (e) {
      return false;
    }
  }

  /**
   * Logs full details ONLY on success.
   */
  logSuccess(headers: any, rawBody: string, parsedBody: any) {
    console.log('--- WEBHOOK OK ---');
    console.log('HEADERS:', JSON.stringify(headers, null, 2));
    console.log('RAW BODY:', rawBody || '(EMPTY)');
    console.log('PARSED BODY:', JSON.stringify(parsedBody, null, 2));
    console.log('------------------');
  }
}
