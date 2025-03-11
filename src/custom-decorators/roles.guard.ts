import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  // can activate recibe el contexto y devuelve un booleano
  canActivate(context: ExecutionContext): boolean {
    // cheuqeamos primero qeu tengamos roles requeridos en nuestro controller
    // obtenemos la informacion del decorador
    const requiredRoles = this.reflector.get<string[]>(
      ROLES_KEY,
      context.getHandler(),
    );
    // si no hay roles retornamos true
    if (!requiredRoles) return true;

    // accedemos a la request al campo user
    const { user } = context.switchToHttp().getRequest();
    console.log('User ', user, typeof user.roles);

    // chequeamos que el rol del user este en alguno de los roles requeridos
    // retornamos true o false
    return requiredRoles.some((role) => user.roles.includes(role));
  }
}

// Por que Roles en plural? porque un usuario puede tener varios roles
// y un rol puede ser requerido por varios endpoints