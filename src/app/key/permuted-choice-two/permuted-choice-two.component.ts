import { Component, OnInit, OnDestroy } from '@angular/core';
import { KeyService } from '../key.service';
import { Subscription } from '../../../../node_modules/rxjs';
import { KeyGenerator } from '../../shared/key-generator.service';

@Component({
  selector: 'app-permuted-choice-two',
  templateUrl: './permuted-choice-two.component.html',
  styleUrls: ['./permuted-choice-two.component.css']
})
export class PermutedChoiceTwoComponent implements OnInit, OnDestroy {

  permutedChoiceTwoSubscription: Subscription;
  permutedChoiceTwo: String;
 
  constructor(
    private keyService: KeyService,
    private keyGenerator: KeyGenerator) { }

  ngOnInit() {
    this.permutedChoiceTwo = this.keyGenerator.getBinaryKey();
    this.permutedChoiceTwoSubscription = this.keyGenerator.binaryKeyChanged.subscribe(data => { 
      this.permutedChoiceTwo = data.join('');
    });
  }

  ngOnDestroy() {
    this.permutedChoiceTwoSubscription.unsubscribe();
  }
}
