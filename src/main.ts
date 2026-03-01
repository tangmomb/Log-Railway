import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { 
    rawBody: true, // Native NestJS way
  });
  
  // Explicitly capture raw body for Express to be doubly sure
  app.use(json({
    verify: (req: any, res, buf) => {
      req.rawBody = buf;
    }
  }));
  app.use(urlencoded({
    extended: true,
    verify: (req: any, res, buf) => {
      req.rawBody = buf;
    }
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
