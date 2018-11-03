import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from '../../../../node_modules/rxjs';
import { EncryptionService } from '../encryption.service';

@Component({
  selector: 'app-l0',
  templateUrl: './l0.component.html',
  styleUrls: ['./l0.component.css']
})
export class L0Component implements OnInit, OnDestroy {

  leftSubscription: Subscription;
  left: String;
  
  constructor(private encryptionService: EncryptionService) { }

  ngOnInit() {
    this.leftSubscription = this.encryptionService.left.subscribe(data => this.left = data.join(''));
  }

  ngOnDestroy() {
    this.leftSubscription.unsubscribe();
  }

}
