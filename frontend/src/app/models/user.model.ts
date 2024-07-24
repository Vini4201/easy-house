export class User {
  id?: number;
  firstName!: string;
  lastName!: string;
  userName!: string;
  phone!: string;
  email!: string;
  userPassword!: string;
  confirmPassword!: string;
  address!: string;
  userRole!: 'SUPER_ADMIN'|'ADMIN' | 'SELLER' | 'BUYER';
}

export enum UserRole {
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
  SELLER = 'SELLER',
  BUYER='BUYER'

}
