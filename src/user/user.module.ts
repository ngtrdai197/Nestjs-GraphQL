import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserResolver } from './resolvers/user.resolver';
import { userSchema } from './schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: userSchema }])],
  providers: [UserService, UserResolver],
  controllers: [],
  exports: [UserService],
})
export class UserModule {}
