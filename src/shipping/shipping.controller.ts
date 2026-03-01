import {
  Controller,
  Post,
  Req,
  Headers,
  Body,
  Res,
} from '@nestjs/common';
import type { RawBodyRequest } from '@nestjs/common';
import { Request, Response } from 'express';
import { ShippingService } from './shipping.service';

@Controller('shipping')
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @Post('webhook')
  async handleWebhook(
    @Headers() headers: any,
    @Body() parsedBody: any,
    @Req() req: RawBodyRequest<Request>,
    @Res() res: Response,
  ) {
    const rawBody = req.rawBody ? req.rawBody.toString('utf8') : '';
    const isVerified = this.shippingService.verifySignature(headers, rawBody);

    if (!isVerified) {
      console.log('Webhook non ok');
      return res.status(401).send('ERREUR');
    }

    // Success: Log full details and return status
    this.shippingService.logSuccess(headers, rawBody, parsedBody);
    return res.status(200).send({ status: 'received' });
  }
}
