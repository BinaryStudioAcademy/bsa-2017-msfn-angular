import { IWindow } from './../models/window';
import { Injectable } from '@angular/core';

@Injectable()
export class WindowObj {

  get data(): IWindow {
    return (window as IWindow);
  }

}
