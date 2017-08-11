import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class LoginService {

  public userStateUpdate: EventEmitter<any> = new EventEmitter();
  constructor() { }

}
