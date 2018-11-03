import { Component, OnInit, OnDestroy } from '@angular/core';
import { EncryptionService } from '../encryption.service';
import { Subscription } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-r0',
  templateUrl: './r0.component.html',
  styleUrls: ['./r0.component.css']
})
export class R0Component implements OnInit, OnDestroy {

  rightSubscription: Subscription;
  right: String;
  
  constructor(private encryptionService: EncryptionService) { }

  ngOnInit() {
    this.rightSubscription = this.encryptionService.right.subscribe(data => this.right = data.join(''));
  }

  ngOnDestroy() {
    this.rightSubscription.unsubscribe();
  }
}
