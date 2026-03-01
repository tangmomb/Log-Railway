import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class ShippingService {
  constructor(private configService: ConfigService) {}

  /**
   * Strictly verifies the Sendcloud signature using HMAC-SHA256.
   * Fails if the secret is missing, if the signature is missing, or if they don't match.
   */
  verifySignature(headers: any, rawBody: string): boolean {
    const secret = this.configService.get<string>('SENDCLOUD_WEBHOOK_SECRET');
    
    // ❌ DO NOT allow silently if key is missing
    if (!secret) {
      console.error('CRITICAL ERROR: SENDCLOUD_WEBHOOK_SECRET is not configured in environment variables.');
      throw new InternalServerErrorException('Server configuration error: Webhook secret missing.');
    }

    const signature = headers['sendcloud-signature'] || headers['x-sendcloud-signature'];
    
    // ❌ DO NOT allow if signature is missing
    if (!signature) {
      console.warn('Unauthorized: Missing signature header.');
      return false;
    }

    const calculatedHash = crypto
      .createHmac('sha256', secret)
      .update(rawBody)
      .digest('hex');

    // ✅ Secure timing-safe comparison
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

    // ❌ Reject if verification failed
    if (!isVerified) {
        throw new UnauthorizedException('Invalid or missing signature.');
    }
  }
}
