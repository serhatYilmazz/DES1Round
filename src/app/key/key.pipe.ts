import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'binary8Format'
})
export class KeyPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let newText = '';
    for(let i = 0; i < value.length; i++) {
      if(i % 8 === 0 && i !== 0){
        newText += ' ';
      }
      newText += value.charAt(i);
    }
    return newText;
  }

}
