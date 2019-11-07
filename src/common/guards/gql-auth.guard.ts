import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GqlAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    if (req.headers['authorization']) {
      req.user = {
        username: 'nguyendai',
        password: 'Aloalo123',
        fullName: 'Nguyen Trong Dai',
      };
      return req;
    }
    return false;
  }
}

// export class GqlAuthGuard extends AuthGuard('jwt') {
//   getRequest(context: ExecutionContext) {
//     const ctx = GqlExecutionContext.create(context);
//     return ctx.getContext();
//     // const userReq = req.headers['authorization'];
//     // if (userReq) {
//     //   req.access_token = userReq;
//     //   return req;
//     // }
//     // return req;
//   }
// }
