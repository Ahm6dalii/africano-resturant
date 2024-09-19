import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createServer } from 'http';
import { Server } from 'socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const server = createServer(app.getHttpServer());
  const io = new Server(server);
  const connectedUsers = {};

  io.on('connection', (socket) => {
    console.log('a user connected', socket.id);


    socket.on('disconnect', () => {
      console.log('user disconnected', socket.id);
    });
  });

  app.use((req, res, next) => {
    req.io = io;
    next();
  });

  await app.listen(3000);
}
bootstrap();
