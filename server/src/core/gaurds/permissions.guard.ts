import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.get<string[]>('permissions', context.getHandler());

    if (!requiredPermissions) {
      return true;  
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if(user.isSuperAdmin==true) {
      return true
    }
    const hasPermission = requiredPermissions.every(permission => user.permissions.includes(permission));

    if (!hasPermission) {
      throw new ForbiddenException('You do not have the required permissions');
    }

    return hasPermission;
  }
}
