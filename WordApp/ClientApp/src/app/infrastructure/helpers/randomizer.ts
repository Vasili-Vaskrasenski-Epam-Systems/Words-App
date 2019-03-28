import { Injectable } from '@angular/core';
import { AlertService } from './../../alert/alert.service';

@Injectable()
export class Randomizer {

  constructor(private alertService: AlertService) {  }

  public getRandomArrayIndexes(items: Array<any>, count: number): Array<number> {
    if (items.length < count) {
      var errorMessage = "Randomizer received an array with less length than requested count";
      this.alertService.error(errorMessage);
      throw errorMessage;
    }

    var indexes = new Array<number>();

    while (indexes.length < count) {
      var number = Math.floor(Math.random() * (items.length));
      if (!indexes.find(el => el === number)) {
        indexes.push(number);
      }
    }
    return indexes;
  }
}
