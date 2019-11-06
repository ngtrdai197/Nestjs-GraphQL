import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const FriendsRequestSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    toUser: { type: Schema.Types.ObjectId, ref: 'User' },

    notification: { type: String },
    status: { type: Number },
  },
);
