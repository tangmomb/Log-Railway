import {
  Controller,
  Post,
  Req,
  Headers,
  Body,
  HttpCode,
} from '@nestjs/common';
import type { RawBodyRequest } from '@nestjs/common';
import { Request } from 'express';
import { ShippingService } from './shipping.service';

@Controller('shipping')
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @Post('webhook')
  @HttpCode(200)
  handleWebhook(
    @Headers() headers: any,
    @Body() parsedBody: any, // We add this back to see if NestJS can parse it at all
    @Req() req: RawBodyRequest<Request>,
  ) {
    const rawBody = req.rawBody ? req.rawBody.toString('utf8') : '';
    
    // Diagnostic logging
    this.shippingService.logWebhook(headers, rawBody, parsedBody);
    
    return { status: 'received' };
  }
}
