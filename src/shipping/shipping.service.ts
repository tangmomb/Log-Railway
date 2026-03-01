import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class ShippingService {
  constructor(private configService: ConfigService) {}

  verifySignature(headers: any, rawBody: string): boolean {
    const secret = this.configService.get<string>('SENDCLOUD_WEBHOOK_SECRET');
    if (!secret) {
      console.warn('SENDCLOUD_WEBHOOK_SECRET is not defined');
      return true; // Still allow for debug if no secret is set
    }

    // Sendcloud uses 'sendcloud-signature' or 'x-sendcloud-signature'
    const signature = headers['sendcloud-signature'] || headers['x-sendcloud-signature'];
    
    if (!signature) {
      console.error('No signature found in headers');
      return false;
    }

    const calculatedHash = crypto
      .createHmac('sha256', secret)
      .update(rawBody)
      .digest('hex');

    // Timing-safe comparison to prevent timing attacks
    try {
        return crypto.timingSafeEqual(
            Buffer.from(calculatedHash, 'utf8'),
            Buffer.from(signature, 'utf8')
        );
    } catch (e) {
        return false;
    }
  }

  logWebhook(headers: any, rawBody: string, parsedBody: any) {
    const isVerified = this.verifySignature(headers, rawBody);
    
    console.log('--- HEADERS ---');
    console.log(JSON.stringify(headers, null, 2));

    console.log('--- VERIFICATION ---');
    console.log('Signature Verified:', isVerified);

    console.log('--- RAW BODY ---');
    console.log(rawBody || '(EMPTY)');
    
    console.log('--- PARSED BODY ---');
    console.log(JSON.stringify(parsedBody, null, 2));
    
    console.log('----------------');

    if (!isVerified) {
        throw new UnauthorizedException('Invalid signature');
    }
  }
}
