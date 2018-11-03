import { Injectable } from '@angular/core';
import { BinaryService } from '../binary.service';
import { Subject } from '../../../node_modules/rxjs';
import { KeyGenerator } from '../shared/key-generator.service';

@Injectable()
export class EncryptionService {

  constructor(
    private binaryService: BinaryService,
    private keyGeneratorService: KeyGenerator) { }

  initialPermutation = new Subject<String[]>();
  left = new Subject<String[]>();
  right = new Subject<String[]>();
  expansionPermutation = new Subject<String[]>();
  xorOperation = new Subject<String[]>();
  sBox = new Subject<String[]>();
  outerPermutation = new Subject<String[]>();
  outerXor = new Subject<String[]>();
  endOfTheRound = new Subject<String[]>();

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
  ];

  s1 = [
    14,  4,  13,  1,   2, 15,  11,  8,   3, 10,   6, 12,   5,  9,   0,  7,
	   0, 15,   7,  4,  14,  2,  13,  1,  10,  6,  12, 11,   9,  5,   3,  8,
	   4,  1,  14,  8,  13,  6,   2, 11,  15, 12,   9,  7,   3, 10,   5,  0,
	  15, 12,   8,  2,   4,  9,   1,  7,   5, 11,   3, 14,  10,  0,   6, 13
  ];

  s2 = [
    15,  1,   8, 14,   6, 11,   3,  4,   9,  7,   2, 13,  12,  0,   5, 10,
	   3, 13,   4,  7,  15,  2,   8, 14,  12,  0,   1, 10,   6,  9,  11,  5,
	   0, 14,   7, 11,  10,  4,  13,  1,   5,  8,  12,  6,   9,  3,   2, 15,
	  13,  8,  10,  1,   3, 15,   4,  2,  11,  6,   7, 12,   0,  5,  14,  9
  ];

  s3 = [
    10,  0,   9, 14,   6,  3,  15,  5,   1, 13,  12,  7,  11,  4,   2,  8,
	  13,  7,   0,  9,   3,  4,   6, 10,   2,  8,   5, 14,  12, 11,  15,  1,
	  13,  6,   4,  9,   8, 15,   3,  0,  11,  1,   2, 12,   5, 10,  14,  7,
	   1, 10,  13,  0,   6,  9,   8,  7,   4, 15,  14,  3,  11,  5,   2, 12
  ];

  s4 = [
     7, 13,  14,  3,   0,  6,   9, 10,   1,  2,   8,  5,  11, 12,   4, 15,
	  13,  8,  11,  5,   6, 15,   0,  3,   4,  7,   2, 12,   1, 10,  14,  9,
	  10,  6,   9,  0,  12, 11,   7, 13,  15,  1,   3, 14,   5,  2,   8,  4,
	   3, 15,   0,  6,  10,  1,  13,  8,   9,  4,   5, 11,  12,  7,   2, 14
  ];

  s5 = [
     2, 12,   4,  1,   7, 10,  11,  6,   8,  5,   3, 15,  13,  0,  14,  9,
	  14, 11,   2, 12,   4,  7,  13,  1,   5,  0,  15, 10,   3,  9,   8,  6,
	   4,  2,   1, 11,  10, 13,   7,  8,  15,  9,  12,  5,   6,  3,   0, 14,
	  11,  8,  12,  7,   1, 14,   2, 13,   6, 15,   0,  9,  10,  4,   5,  3
  ];

  s6 = [
    12,  1,  10, 15,   9,  2,   6,  8,   0, 13,   3,  4,  14,  7,   5, 11,
    10, 15,   4,  2,   7, 12,   9,  5,   6,  1,  13, 14,   0, 11,   3,  8,
     9, 14,  15,  5,   2,  8,  12,  3,   7,  0,   4, 10,   1, 13,  11,  6,
     4,  3,   2, 12,   9,  5,  15, 10,  11, 14,   1,  7,   6,  0,   8, 13
  ];

  s7 = [
     4, 11,   2, 14,  15,  0,   8, 13,   3, 12,   9,  7,   5, 10,   6,  1,
	  13,  0,  11,  7,   4,  9,   1, 10,  14,  3,   5, 12,   2, 15,   8,  6,
	   1,  4,  11, 13,  12,  3,   7, 14,  10, 15,   6,  8,   0,  5,   9,  2,
	   6, 11,  13,  8,   1,  4,  10,  7,   9,  5,   0, 15,  14,  2,   3, 12
  ];

  s8 = [
    13,  2,   8,  4,   6, 15,  11,  1,  10,  9,   3, 14,   5,  0,  12,  7,
	   1, 15,  13,  8,  10,  3,   7,  4,  12,  5,   6, 11,   0, 14,   9,  2,
	   7, 11,   4,  1,   9, 12,  14,  2,   0,  6,  10, 13,  15,  3,   5,  8,
	   2,  1,  14,  7,   4, 10,   8, 13,  15, 12,   9,  0,   3,  5,   6, 11
  ];

  fPermutation = [
    16, 7, 20, 21,
    29, 12, 28, 17,
    1, 15, 23, 26,
    5, 18, 31, 10,
    2, 8, 24, 14,
    32, 27, 3, 9,
    19, 13, 30, 6,
    22, 11, 4, 25
  ];

  sBoxConfiguration = {
    1: this.s1,
    2: this.s2,
    3: this.s3,
    4: this.s4,
    5: this.s5,
    6: this.s6,
    7: this.s7,
    8: this.s8,
  }



  startEncryption(message: String) {
    let _64bitMessage = this.permutation(this.initialPermutationMatrix, this.binaryService.convertToBinary(message));
    this.initialPermutation.next(_64bitMessage);

    let halvedKey = this.halvePermutedInput(_64bitMessage);
    this.left.next(halvedKey.left);
    this.right.next(halvedKey.right);
    
    let r0Expanded = this.permutation(this.expansionPermutationMatrix, halvedKey.right);
    this.expansionPermutation.next(r0Expanded);
    
    let xored = this.xor(r0Expanded, this.keyGeneratorService.getBinaryKey().split(''));
    this.xorOperation.next(xored);

    let sBoxed = this.sBoxOperation(xored);
    this.sBox.next(sBoxed);

    let outerPermutation = this.permutation(this.fPermutation, sBoxed);
    this.outerPermutation.next(outerPermutation);

    let lastXor = this.xor(halvedKey.left, outerPermutation);
    this.outerXor.next(lastXor);

    let endOfTheRound = halvedKey.left.concat(lastXor);
    this.endOfTheRound.next(endOfTheRound);
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
    
    return {left: left, right: right};
  }

  xor(matrix1: Array<String>, matrix2: Array<String>) {
    let xoredMatrix = [];
    let counter = 0;

    let currentKeyAsNumber = matrix2.map(Number);
    let matrixAsNumber = matrix1.map(Number);

    console.log('=============XOR=======================');
    currentKeyAsNumber.forEach((data) => {
      xoredMatrix.push(data ^ matrixAsNumber[counter]);
      counter++;
    });

    console.log(xoredMatrix);
    return xoredMatrix.map(String);
  }

  sBoxOperation(matrix: Array<String>) {
    let numberMatrix = matrix.map(Number);
    let totalMatrix = [];

    for(let i = 1; i <= 8; i++) {
      let row = "" + numberMatrix[5] + numberMatrix[0];
      let rowDecimal = this.binaryService.convertBinaryToDecimal(row);
      let column = "" + numberMatrix[4] + numberMatrix[3] + numberMatrix[2] + numberMatrix[1];
      let columnDecimal = this.binaryService.convertBinaryToDecimal(column);
      totalMatrix.push(this.sBoxExchange(columnDecimal, rowDecimal, this.sBoxConfiguration[i]));
      numberMatrix.splice(0, 6);
    }

    let totalMatrixAsString = totalMatrix.join('');
    return totalMatrixAsString.split('');
  }

  sBoxExchange(column, row, round) {
    let index = 16 * row + column;
    return this.binaryService.convertBinaryNotation(round[index]);
  }
}
