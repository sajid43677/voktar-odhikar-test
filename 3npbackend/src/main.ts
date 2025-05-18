import { NestFactory, Reflector,  } from '@nestjs/core';
import * as session from 'express-session';
import { AppModule } from './app.module';
import { 
  CacheInterceptor, 
  CACHE_MANAGER, 
} from '@nestjs/cache-manager';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      cookie:{
        secure: false,
        httpOnly: false,
        maxAge: 30000000
      }
    }),
  );  
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
