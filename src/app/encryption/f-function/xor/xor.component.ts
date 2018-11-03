import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from '../../../../../node_modules/rxjs';
import { EncryptionService } from '../../encryption.service';

@Component({
  selector: 'app-xor',
  templateUrl: './xor.component.html',
  styleUrls: ['./xor.component.css']
})
export class XorComponent implements OnInit, OnDestroy {

  xorSubscription: Subscription;

  xorValue: String;

  constructor(private encryptionService: EncryptionService) { }

  ngOnInit() {
    this.xorSubscription = this.encryptionService.xorOperation.subscribe(
      data => this.xorValue = data.join('')
    );
  }

  ngOnDestroy() {
    this.xorSubscription.unsubscribe();
  }

}
