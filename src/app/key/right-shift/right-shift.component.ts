import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from '../../../../node_modules/rxjs';
import { KeyService } from '../key.service';

@Component({
  selector: 'app-right-shift',
  templateUrl: './right-shift.component.html',
  styleUrls: ['./right-shift.component.css']
})
export class RightShiftComponent implements OnInit, OnDestroy {

  rightShiftedSubscription: Subscription;
  rightShifted: String;

  constructor(private keyService: KeyService) { }

  ngOnInit() {
    this.rightShiftedSubscription = this.keyService.rightShifted.subscribe(data => this.rightShifted = data.join(''));
  }

  ngOnDestroy() {
    this.rightShiftedSubscription.unsubscribe();
  }

}
