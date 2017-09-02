import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateSignup(user) {
    return user.name === undefined || user.password === undefined;
  }

  validateLogin(user) {
    return !(user.username !== undefined && user.password === undefined);
  }

}
