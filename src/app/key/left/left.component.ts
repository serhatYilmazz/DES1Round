import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from '../../../../node_modules/rxjs';
import { KeyService } from '../key.service';

@Component({
  selector: 'app-left',
  templateUrl: './left.component.html',
  styleUrls: ['./left.component.css']
})
export class LeftComponent implements OnInit, OnDestroy {

  leftSubscription: Subscription;
  left: String;
  
  constructor(private keyService: KeyService) { }

  ngOnInit() {
    this.leftSubscription = this.keyService.left.subscribe(data => this.left = data.join(''));
  }

  ngOnDestroy() {
    this.leftSubscription.unsubscribe();
  }

}
