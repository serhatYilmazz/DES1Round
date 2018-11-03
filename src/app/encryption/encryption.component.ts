import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '../../../node_modules/@angular/forms';
import { EncryptionService } from './encryption.service';
import { Subscription } from '../../../node_modules/rxjs';
import { KeyService } from '../key/key.service';
import { ValidatorService } from '../shared/validator.service';

@Component({
  selector: 'app-encryption',
  templateUrl: './encryption.component.html',
  styleUrls: ['./encryption.component.css']
})
export class EncryptionComponent implements OnInit, OnDestroy {

  messageForm: FormGroup;
  keyReq: FormGroup;

  leftSubscription: Subscription;
  rightSubscription: Subscription;
  keySubscription: Subscription;
  expansionPermutationSubscription: Subscription;

  left: String;
  right: String;
  key: String;
  expansionPermutation: String;

  constructor(
    private encryptionService: EncryptionService, 
    private keyService: KeyService,
    private validator: ValidatorService) { }

  ngOnInit() {
    this.messageForm = new FormGroup({
      message: new FormControl(null)
    });
    this.keyReq = new FormGroup({
      key: new FormControl("", [Validators.required, this.validator.keyLengthError.bind(this), this.validator.keyLengthApprovment.bind(this)])
    });

    this.leftSubscription = this.encryptionService.left.subscribe(data => this.left = data.join(''));
    this.rightSubscription = this.encryptionService.right.subscribe(data => this.right = data.join(''));
    this.keySubscription = this.keyService.permutedChoiceTwoSubject.subscribe(data => this.key = data.join(''));
    this.expansionPermutationSubscription = this.encryptionService.expansionPermutation.subscribe(data => this.expansionPermutation = data.join(''));
  }

  onSubmit() {
    this.encryptionService.startEncryption(this.messageForm.value.message);
  }

  ngOnDestroy() {
    this.leftSubscription.unsubscribe();
    this.rightSubscription.unsubscribe();
    this.keySubscription.unsubscribe();
    this.expansionPermutationSubscription.unsubscribe();
  }

  getKey() {
    this.keyService.getKey(this.keyReq.value.key);
    this.keyReq.patchValue({
      key: this.key
    })
  }
}
