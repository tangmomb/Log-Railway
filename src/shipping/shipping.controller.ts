import {
  Controller,
  Post,
  Req,
  Headers,
  HttpCode,
} from '@nestjs/common';
import type { Request } from 'express';

@Controller('shipping')
export class ShippingController {

  @Post('webhook')
  @HttpCode(200)
  handleWebhook(
    @Headers() headers: any,
    @Req() req: Request & { rawBody?: string },
  ) {

    const rawBody = req.rawBody ?? '';

    console.log('--- WEBHOOK RECEIVED ---');
    console.log('HEADERS:', headers);
    console.log('RAW BODY:', rawBody);
    console.log('------------------------');

    return { status: 'received' };
  }
}