import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserService } from './user.service'
import { UserResolver } from './resolvers/user.resolver'
import { userSchema } from './schemas/user.schema'
import { FriendsRequestModule } from '../friends-request/friends-request.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: userSchema }]),
    FriendsRequestModule,
  ],
  providers: [UserService, UserResolver],
  controllers: [],
  exports: [UserService],
})
export class UserModule {}
