import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from '../../../../node_modules/rxjs';
import { KeyService } from '../key.service';

@Component({
  selector: 'app-left-shift',
  templateUrl: './left-shift.component.html',
  styleUrls: ['./left-shift.component.css']
})
export class LeftShiftComponent implements OnInit, OnDestroy {

  leftShiftedSubscription: Subscription;
  leftShifted: String;

  constructor(private keyService: KeyService) { }

  ngOnInit() {
    this.leftShiftedSubscription = this.keyService.leftShifted.subscribe(data => this.leftShifted = data.join(''));
  }

  ngOnDestroy() {
    this.leftShiftedSubscription.unsubscribe();
  }

}
