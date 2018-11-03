import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from '../../../../node_modules/rxjs';
import { KeyService } from '../key.service';

@Component({
  selector: 'app-right',
  templateUrl: './right.component.html',
  styleUrls: ['./right.component.css']
})
export class RightComponent implements OnInit, OnDestroy {

  rightSubscription: Subscription;
  right: String;

  constructor(private keyService: KeyService) { }

  ngOnInit() {
    this.rightSubscription = this.keyService.right.subscribe(data => this.right = data.join(''));
  }

  ngOnDestroy() {
    this.rightSubscription.unsubscribe();
  }
}
