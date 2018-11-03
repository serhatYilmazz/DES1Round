import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from '../../../../node_modules/rxjs';
import { EncryptionService } from '../encryption.service';

@Component({
  selector: 'app-outer-xor',
  templateUrl: './outer-xor.component.html',
  styleUrls: ['./outer-xor.component.css']
})
export class OuterXorComponent implements OnInit, OnDestroy {

  outerXor: String;
  outerXorSubscription: Subscription;
  
  constructor(private encryptionService: EncryptionService) { }

  ngOnInit() {
    this.outerXorSubscription = this.encryptionService.outerXor.subscribe(data => this.outerXor = data.join(''));
  }

  ngOnDestroy() {
    this.outerXorSubscription.unsubscribe();
  }

}
