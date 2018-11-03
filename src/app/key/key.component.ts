import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Form, FormControl } from '@angular/forms';
import { KeyService } from './key.service';
import { Subscription } from '../../../node_modules/rxjs';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.css']
})
export class KeyComponent implements OnInit, OnDestroy {
  
  keyForm: FormGroup;
  permutedKey: String;

  permutedChoiceOneSubscription: Subscription;
  permutedChoiceTwoSubscription: Subscription;
  leftSubscription: Subscription;
  rightSubscription: Subscription;
  leftShiftedSubscription: Subscription;
  rightShiftedSubscription: Subscription;
  combinedSubscription: Subscription;

  permutedChoiceOne: String;
  left: String;
  right: String;
  leftShifted: String;
  rightShifted: String;
  combined: String;
  permutedChoiceTwo: String;

  constructor(private keyService: KeyService) { }

  ngOnInit() {
    this.keyForm = new FormGroup({
      key: new FormControl(null)
    });
    this.permutedChoiceOneSubscription = this.keyService.permutedChoiceOneSubject.subscribe(data => this.permutedChoiceOne = data.join(''));
    this.leftSubscription = this.keyService.left.subscribe(data => this.left = data.join(''));
    this.rightSubscription = this.keyService.right.subscribe(data => this.right = data.join(''));
    this.leftShiftedSubscription = this.keyService.leftShifted.subscribe(data => this.leftShifted = data.join(''));
    this.rightShiftedSubscription = this.keyService.rightShifted.subscribe(data => this.rightShifted = data.join(''));
    this.combinedSubscription = this.keyService.combined.subscribe(data => this.combined = data.join(''));
    this.permutedChoiceTwoSubscription = this.keyService.permutedChoiceTwoSubject.subscribe(data => this.permutedChoiceTwo = data.join(''));
  }

  onSubmit() {
    this.keyService.getKey(this.keyForm.value.key);
  }

  ngOnDestroy() {
    this.permutedChoiceOneSubscription.unsubscribe();
    this.leftSubscription.unsubscribe();
    this.rightSubscription.unsubscribe();
    this.leftShiftedSubscription.unsubscribe();
    this.rightShiftedSubscription.unsubscribe();
    this.combinedSubscription.unsubscribe();
    this.permutedChoiceTwoSubscription.unsubscribe();
  }

}
