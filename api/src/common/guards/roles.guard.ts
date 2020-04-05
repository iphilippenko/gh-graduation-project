// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { User } from 'src/users/schemas/user.schema';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   private readonly roles: Array<User['role']>;
//   constructor(roles) {
//     this.roles = roles;
//   }

//   canActivate(context: ExecutionContext) {
//     const { user } = context.switchToHttp().getRequest();
//     return this.roles.includes(user.role);
//   }
// }

// export const IsUserAdmin = new RolesGuard(['admin']);
