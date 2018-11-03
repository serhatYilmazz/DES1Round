import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from '../../../../../node_modules/rxjs';
import { EncryptionService } from '../../encryption.service';

@Component({
  selector: 'app-s-box',
  templateUrl: './s-box.component.html',
  styleUrls: ['./s-box.component.css']
})
export class SBoxComponent implements OnInit, OnDestroy {

  sBox: String;
  sBoxSubscription: Subscription;
  constructor(private encryptionService: EncryptionService) { }

  ngOnInit() {
    this.sBoxSubscription = this.encryptionService.sBox.subscribe(
      data => this.sBox = data.join('')
    );
  }
  
  ngOnDestroy() {
    this.sBoxSubscription.unsubscribe();
  }

}
