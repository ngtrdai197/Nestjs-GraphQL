import { Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigService } from './common/config/config.service';
import { ConfigModule } from './common/config/config.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FriendsRequestModule } from './friends-request/friends-request.module';
import { AuthModule } from './common/auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.graphql',
      context: ({ req }) => ({ req }),
      installSubscriptionHandlers: true, // enable subscription graphql
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.uriConnectDB,
        options: {
          useNewUrlParser: true,
          useCreateIndex: true,
          useFindAndModify: true,
          useUnifiedTopology: true,
        },
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    ConfigModule,
    FriendsRequestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
