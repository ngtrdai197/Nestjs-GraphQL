import { Module } from '@nestjs/common';
import { FriendsRequestService } from './friends-request.service';
import { FriendsRequestResolver } from './graphql/friends-request.resolver';
import { FriendsRequestController } from './friends-request.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FriendsRequestSchema } from './schemas/friends-request.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'FriendRequest', schema: FriendsRequestSchema }])],
  providers: [FriendsRequestService, FriendsRequestResolver],
  controllers: [FriendsRequestController],
})
export class FriendsRequestModule {}
