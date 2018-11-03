import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '../../../node_modules/@angular/forms';
import { EncryptionService } from './encryption.service';
import { Subscription } from '../../../node_modules/rxjs';
import { KeyService } from '../key/key.service';
import { ValidatorService } from '../shared/validator.service';
import { KeyGenerator } from '../shared/key-generator.service';

@Component({
  selector: 'app-encryption',
  templateUrl: './encryption.component.html',
  styleUrls: ['./encryption.component.css']
})
export class EncryptionComponent implements OnInit, OnDestroy {

  messageForm: FormGroup;
  keyReq: FormGroup;

  keySubscription: Subscription;
  
  key: String;
  message: String;
  
  constructor(
    private encryptionService: EncryptionService, 
    private keyService: KeyService,
    private validator: ValidatorService,
    private keyGenerator: KeyGenerator) { }

  ngOnInit() {
    this.key = this.keyGenerator.getBinaryKey();
    this.message = this.keyGenerator.getMessage();
    this.messageForm = new FormGroup({
      message: new FormControl(this.message, [this.validator.keyLengthError.bind(this), Validators.required])
    });
    
  

    this.keyReq = new FormGroup({
      key: new FormControl(this.key, [Validators.required, this.validator.keyLengthError.bind(this), this.validator.keyLengthApprovment.bind(this)])
    });

    this.keySubscription = this.keyGenerator.binaryKeyChanged.subscribe(
      data => this.key = data.join('')
    );
  }

  onSubmit() {
    this.encryptionService.startEncryption(this.messageForm.value.message);
  }

  ngOnDestroy() {
    this.keySubscription.unsubscribe();
  }

  getKey() {
    this.keyService.getKey(this.keyReq.value.key);
    this.keyGenerator.changeDecimalKey(this.keyReq.value.key);
    this.keyReq.patchValue({
      key: this.key
    })
  }
}
