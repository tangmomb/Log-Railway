import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Capture RAW body AVANT le parsing JSON
  app.use(
    express.json({
      verify: (req: any, res, buf) => {
        req.rawBody = buf.toString('utf8');
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();