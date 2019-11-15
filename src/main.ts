import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from './common/config/config.service';
import { ValidationPipe } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  app.use(compression());
  app.use(helmet());
  app.use(
    morgan('common', {
      stream: fs.createWriteStream(
        path.join(__dirname, '..', '/logs/access.log'),
        {
          flags: 'a',
        },
      ),
    }),
  );
  const options = new DocumentBuilder()
    .setTitle('App-Graphql')
    .setDescription('The app graphql api description')
    .setVersion('1.0')
    .addTag('Graphql')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const configService: ConfigService = app.get(ConfigService);
  await app.listen(configService.port, () =>
    console.log(`Server running on port: ${configService.port}`),
  );
}
bootstrap().catch(error => console.log(error));
