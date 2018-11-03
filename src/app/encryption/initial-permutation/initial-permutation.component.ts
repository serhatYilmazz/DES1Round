import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from '../../../../node_modules/rxjs';
import { EncryptionService } from '../encryption.service';

@Component({
  selector: 'app-initial-permutation',
  templateUrl: './initial-permutation.component.html',
  styleUrls: ['./initial-permutation.component.css']
})
export class InitialPermutationComponent implements OnInit, OnDestroy {

  initialPermutationSubscription: Subscription;

  initialPermutation: String;

  constructor(
    private encryptionService: EncryptionService
  ) { }

  ngOnInit() {
    this.initialPermutationSubscription = this.encryptionService.initialPermutation.subscribe(
      data => this.initialPermutation = data.join('')
    );
  }

  ngOnDestroy() {
    this.initialPermutationSubscription.unsubscribe();
  }

}
