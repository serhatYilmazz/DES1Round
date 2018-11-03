import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from '../../../../node_modules/rxjs';
import { EncryptionService } from '../encryption.service';

@Component({
  selector: 'app-end-of-round',
  templateUrl: './end-of-round.component.html',
  styleUrls: ['./end-of-round.component.css']
})
export class EndOfRoundComponent implements OnInit, OnDestroy {

  combinedMessage: String;
  combinedMessageSubscription: Subscription

  constructor(private encryptionService: EncryptionService) { }

  ngOnInit() {
    this.encryptionService.endOfTheRound.subscribe(
      data => this.combinedMessage = data.join('')
    );
  }

  ngOnDestroy() {

  }

}
