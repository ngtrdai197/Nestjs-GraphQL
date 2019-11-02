import { Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigService } from './common/config/config.service';
import { ConfigModule } from './common/config/config.module';
import { MongooseModule } from '@nestjs/mongoose';

const configService: ConfigService = new ConfigService(`development.env`);

@Module({
  imports: [
    GraphQLModule.forRoot({
      // autoSchemaFile: 'schema.graphql',
      typePaths: ['./**/*.graphql'],
    }),
    UserModule,
    ConfigModule,
    MongooseModule.forRoot(
      `mongodb://localhost:27017/${configService.databaseName}`,
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
