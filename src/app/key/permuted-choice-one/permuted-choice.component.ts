import { Component, OnInit, OnDestroy } from '@angular/core';
import { KeyService } from '../key.service';
import { Subscription } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-permuted-choice-one',
  templateUrl: './permuted-choice.component.html',
  styleUrls: ['./permuted-choice.component.css']
})
export class PermutedChoiceOneComponent implements OnInit, OnDestroy {

  permutedChoiceOne: String;
  permutedChoiceOneSubscription: Subscription;

  constructor(private keyService: KeyService) { }

  ngOnInit() {
    this.permutedChoiceOneSubscription = this.keyService.permutedChoiceOneSubject.subscribe(data => this.permutedChoiceOne = data.join(''));
  }

  ngOnDestroy() {
    this.permutedChoiceOneSubscription.unsubscribe();
  }

}
