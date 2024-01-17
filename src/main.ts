import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const rootDirectory = path.join(__dirname, 'uploads');
  if (!fs.existsSync(rootDirectory)) {
    fs.mkdirSync(rootDirectory);
  }


  await app.listen(3000);
}


bootstrap();
