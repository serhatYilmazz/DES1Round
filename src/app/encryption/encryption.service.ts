import { Injectable } from '@angular/core';
import { BinaryService } from '../binary.service';
import { Subject } from '../../../node_modules/rxjs';

@Injectable()
export class EncryptionService {

  constructor(private binaryService: BinaryService) { }

  left = new Subject<String[]>();
  right = new Subject<String[]>();
  expansionPermutation = new Subject<String[]>();

  initialPermutationMatrix = [
    58, 50, 42, 34, 26, 18, 10, 2,
    60, 52, 44, 36, 28, 20, 12, 4,
    62, 54, 46, 38, 30, 22, 14, 6,
    64, 56, 48, 40, 32, 24, 16, 8,
    57, 49, 41, 33, 25, 17,  9, 1,
    59, 51, 43, 35, 27, 19, 11, 3,
    61, 53, 45, 37, 29, 21, 13, 5,
    63, 55, 47, 39, 31, 23, 15, 7];

  expansionPermutationMatrix = [
    32,  1,  2,  3,  4,  5,
     4,  5 , 6,  7,  8,  9,
     8,  9, 10, 11, 12, 13,
    12, 13, 14, 15, 16, 17,
    16, 17, 18, 19, 20, 21,
    20, 21, 22, 23, 24, 25,
    24, 25, 26, 27, 28, 29,
    28, 29, 30, 31, 32,  1
  ]

  startEncryption(message: String) {
    let _64bitMessage = this.permutation(this.initialPermutationMatrix, this.binaryService.convertToBinary(message));
    let halvedKey = this.halvePermutedInput(_64bitMessage);
    let r0Expanded = this.permutation(this.expansionPermutationMatrix, halvedKey.right);
    this.expansionPermutation.next(r0Expanded);
  }

  permutation(permutationMatrix, elements: Array<String>) {
    let permutatedString = [];
    let counter = 0;
    permutationMatrix.forEach(index => {
        permutatedString[counter] = elements[index - 1];
        counter++;
    });
    return permutatedString;
  }

  halvePermutedInput(permutedInput: Array<String>) {
    let left = permutedInput.splice(0, 32);
    let right = permutedInput.splice(0, 32);

    console.log('==================LEFT==================');
    console.log(left);
    console.log('===============RIGHT=====================');
    console.log(right);
    this.left.next(left);
    this.right.next(right);
    return {left: left, right: right};
  }
}
