import { SetMetadata } from '@nestjs/common';
import { Roles } from '@prisma/client';

export const ROLES_KEY = 'roles'; //la key de la metadata donde estan los roles es esta
export const AcceptedRoles = (...roles: Roles[]) => //unspread de los roles aceptados desde el prisma schema
  SetMetadata(ROLES_KEY, roles);
