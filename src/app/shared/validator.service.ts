import { FormControl } from "../../../node_modules/@angular/forms";

export class ValidatorService {
    keyLengthError(control: FormControl): { [s: string]: boolean } {
        if(control.value.length !== 8) {
            return { 'keyLengthException': true };
        }
    }     
    
    keyLengthApprovment(control: FormControl): { [s: string]: boolean } {
        if(control.value.length === 48) {
            return { 'keyLengthTruth': true };
        }
    }

    keyLengthForKeyService(control: FormControl): { [s: string]: boolean } {
        if(control.value.length === 8) {
            return { 'keyLengthTruth': true };
        }
    }
}