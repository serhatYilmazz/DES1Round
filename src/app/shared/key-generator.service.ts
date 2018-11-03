import { OnInit, OnDestroy } from "../../../node_modules/@angular/core";
import { Subject } from "../../../node_modules/rxjs";

export class KeyGenerator implements OnInit, OnDestroy{

    decimalKeyChanged = new Subject<String[]>();
    binaryKeyChanged = new Subject<String[]>();

    private message: String;

    private binaryKey = [];
    private decimalKey = [];
    constructor() {}

    ngOnInit() {

    }

    ngOnDestroy() {

    }

    getMessage() {
        return this.message;
    }

    setMessage(message: String) {
        this.message = message;
    }

    changeBinaryKey(newKey: Array<String>) {
        this.binaryKey = newKey;
        this.binaryKeyChanged.next(this.binaryKey);
    }

    changeDecimalKey(newKey: String) {
        this.decimalKey = newKey.split('');
        this.decimalKeyChanged.next(this.decimalKey);
    }

    getBinaryKey() {
        return this.binaryKey.join('');
    }

    getDecimalKey() {
        return this.decimalKey.join('');
    }
    
}