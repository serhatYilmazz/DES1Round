import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from '../../../../node_modules/rxjs';
import { KeyService } from '../key.service';

@Component({
  selector: 'app-combine',
  templateUrl: './combine.component.html',
  styleUrls: ['./combine.component.css']
})
export class CombineComponent implements OnInit, OnDestroy {

  combinedSubscription: Subscription;
  combined: String;

  constructor(private keyService: KeyService) { }

  ngOnInit() {
    this.combinedSubscription = this.keyService.combined.subscribe(data => this.combined = data.join(''));
  }

  ngOnDestroy() {
    this.combinedSubscription.unsubscribe();
  }
}
