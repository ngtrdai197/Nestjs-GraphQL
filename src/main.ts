import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from './common/config/config.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
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
