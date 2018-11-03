import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BinaryService {

  constructor() { }

  convertToBinary(string: String) {
    let result = [];
    string.split('')
        .forEach((character) => { //  For each splitted character:
            let bin = character.charCodeAt(0).toString(2); // first convert it to ASCII and then binary of it
            let padding = 8 - bin.length; // For example ASCII 115, it converts like '1110011'. İt needs to be 8 digits to be compatible to algorithm.
            let paddingVariable = "";
            for(let i = 0; i < padding; i++) {
                paddingVariable += '0'; // Missing 0s are added as most significant digit.
            }
            result.push(paddingVariable.concat(bin)); // Concatenating result of the character conversion.
        });

    let resultString = result.join('');
    let resultList = resultString.split('');
    console.log('==========BINARY CONVERSION==========================');
    console.log(result);
    console.log('====================================');
    return resultList;
  }
}
