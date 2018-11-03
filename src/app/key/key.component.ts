import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Form, FormControl, Validators } from '@angular/forms';
import { KeyService } from './key.service';
import { Subscription } from '../../../node_modules/rxjs';
import { KeyGenerator } from '../shared/key-generator.service';
import { ValidatorService } from '../shared/validator.service';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.css']
})
export class KeyComponent implements OnInit, OnDestroy {
  
  keyForm: FormGroup;

  firstKeySubscription: Subscription;

  firstKey: String;

  constructor(
    private keyService: KeyService,
    private keyGenerator: KeyGenerator,
    private validatorService: ValidatorService) { }

  ngOnInit() {
    this.firstKey = this.keyGenerator.getDecimalKey();
    this.keyForm = new FormGroup({
      key: new FormControl(this.firstKey, 
        [this.validatorService.keyLengthError.bind(this), 
         this.validatorService.keyLengthForKeyService.bind(this),
        Validators.required])
    });
  }

  onSubmit() {
    this.keyGenerator.changeDecimalKey(this.keyForm.value.key);
    this.keyService.getKey(this.keyForm.value.key);
  }

  ngOnDestroy() {
    
  }

}
