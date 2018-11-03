import { Injectable } from '@angular/core';
import { BinaryService } from '../binary.service';
import { Subject } from '../../../node_modules/rxjs';
import { KeyGenerator } from '../shared/key-generator.service';

@Injectable()
export class KeyService {

  permutedChoiceOneSubject = new Subject<String[]>();
  left = new Subject<String[]>();
  right = new Subject<String[]>();
  leftShifted = new Subject<String[]>();
  rightShifted = new Subject<String[]>();
  combined = new Subject<String[]>();

  permutedChoiceOneMatrix = [
   57, 49, 41, 33, 25, 17,  9,
    1, 58, 50, 42, 34, 26, 18,
   10,  2, 59, 51, 43, 35, 27,
   19, 11,  3, 60, 52, 44, 36,
   63, 55, 47, 39, 31, 23, 15,
    7, 62, 54, 46, 38, 30, 22,
   14,  6, 61, 53, 45, 37, 29,
   21, 13,  5, 28, 20, 12,  4];

   permutedChoiceTwoMatrix = [
     14, 17, 11, 24,  1,  5,
      3, 28, 15,  6, 21, 10,
     23, 19, 12,  4, 26,  8,
     16,  7, 27, 20, 13,  2,
     41, 52, 31, 37, 47, 55,
     30, 40, 51, 45, 33, 48,
     44, 49, 39, 56, 34, 53,
     46, 42, 50, 36, 29, 32
   ]

  
  constructor(
    private binaryService: BinaryService,
    private keyGenerator: KeyGenerator) { }

  permutation(permutationMatrix, elements: Array<String>) {
    let permutatedString = [];
    let counter = 0;
    permutationMatrix.forEach(index => {
        permutatedString[counter] = elements[index - 1];
        counter++;
    });
    return permutatedString;
  }
  
  halveTheKey(_56bitKey: Array<String>) {
    let left = _56bitKey.splice(0, 28);
    let right = _56bitKey.splice(0, 28);

    console.log('==================LEFT==================');
    console.log(left);
    console.log('===============RIGHT=====================');
    console.log(right);
    
    return {left: left, right: right};
  }

  leftShift(list: Array<String>, which: String) {
    let lastOfLeft = list.shift();
    
    list.push(lastOfLeft);
    console.log('==================' + which + '(SHIFTED)==================');
    console.log(list);

    return list;
  }

  combineKeys(leftShiftedKey, rightShiftedKey) {
    let combinedKey = leftShiftedKey.concat(rightShiftedKey);
    console.log('===============COMBINED KEYS=====================');
    console.log(combinedKey);
   
    return combinedKey;
  }

  getKey(key: String) {
    let _56bitKey = this.permutation(this.permutedChoiceOneMatrix, this.binaryService.convertToBinary(key));
    this.permutedChoiceOneSubject.next(_56bitKey);

    let halvedKey = this.halveTheKey(_56bitKey);
    this.left.next(halvedKey.left);
    this.right.next(halvedKey.right);

    let leftShiftedKey = this.leftShift(halvedKey.left, 'LEFT');
    let rightShiftedKey = this.leftShift(halvedKey.right, 'RIGHT');
    this.leftShifted.next(leftShiftedKey);
    this.rightShifted.next(rightShiftedKey);

    let combinedKey = this.combineKeys(leftShiftedKey, rightShiftedKey);
    this.combined.next(combinedKey);

    let permutedChoiceTwo = this.permutation(this.permutedChoiceTwoMatrix, combinedKey);
    this.keyGenerator.changeBinaryKey(permutedChoiceTwo);
    
    return permutedChoiceTwo;
  }
  
}
