import { ObjectType, ID, Field, ArgsType } from 'type-graphql';

@ObjectType()
export class User {
  @Field(type => ID)
  // tslint:disable-next-line:variable-name
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

// tslint:disable-next-line:max-classes-per-file
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

// tslint:disable-next-line:max-classes-per-file
@ObjectType()
export class UsersPagination {
  @Field(type => Number)
  currentPage: number;

  @Field(type => Number)
  total: number;

  @Field(type => [User]!)
  users: [User];

  @Field(type => Number)
  pages: number;
}
