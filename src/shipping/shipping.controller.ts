import {
  Controller,
  Post,
  Req,
  Headers,
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
    @Req() req: RawBodyRequest<Request>,
  ) {
    const rawBody = req.rawBody ? req.rawBody.toString('utf8') : '';
    this.shippingService.logWebhook(headers, rawBody);
    return { status: 'received' };
  }
}
