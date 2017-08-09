import { Injectable } from '@angular/core';
import * as AES from 'crypto-js/aes';

@Injectable()
export class EncryptService {

  private tokenArr: string[] = [
    'YoUnIe2652',
    'scaRy4469210',
    'RAsaVonG238',
    'nONCoM990',
    'lajaNna50',
    'laFluer29446',
    'karaseK938',
    'hOChmAn4859',
    'hinrIchS963',
    'DeCoratiOn15'
  ];

  public encrypt(dataObj) {
    const _rand = Date.now().toString().slice(-1);

    return AES.encrypt(JSON.stringify(dataObj), this.tokenArr[_rand]).toString() + _rand;
  }

}
