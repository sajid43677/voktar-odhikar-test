import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import { AppModule } from './app.module';
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
