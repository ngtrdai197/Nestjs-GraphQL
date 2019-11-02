import { ObjectType, ID, Field, ArgsType } from 'type-graphql';

@ObjectType()
export class User {
  @Field(type => ID)
  _id: string;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  fullName: string;

  @Field({ nullable: true })
  address?: string;
}

@ArgsType()
export class NewUserInput {
  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  fullName: string;

  @Field({ nullable: true })
  address?: string;
}
