import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getNetworkInterfaces } from './util/os';
import { log } from './util';
import { initSwagger } from './config/swagger';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const now = +new Date();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  console.log(join(__dirname, 'static'));

  // app.useStaticAssets('static',);
  app.useStaticAssets(join(__dirname, 'static'), { prefix: '/pages' });

  const configService = app.get(ConfigService);
  const port = configService.get('port', '9000');
  const prefix = configService.get('prefix', 'api');

  app.setGlobalPrefix(prefix);
  initSwagger(app);

  await app.listen(port);
  const { en1, lo0 } = getNetworkInterfaces();

  log('blue', `\n 🚀 服务已启动, 耗时: ${+new Date() - now}ms`);
  log('blue', `📚 接口文档: http://${en1 || lo0}:${port}/docs\n`);
  lo0 && log('green', `✔︎  http://${lo0}:${port}`);
  en1 && log('green', `✔︎  http://${en1}:${port}\n`);
}
bootstrap();
