import { ArgsType, Field } from 'type-graphql'

@ArgsType()
export class Login {
  @Field()
  username: string

  @Field()
  password: string
}
