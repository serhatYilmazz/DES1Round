import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from '../../../../../node_modules/rxjs';
import { EncryptionService } from '../../encryption.service';

@Component({
  selector: 'app-expansion-permutation',
  templateUrl: './expansion-permutation.component.html',
  styleUrls: ['./expansion-permutation.component.css']
})
export class ExpansionPermutationComponent implements OnInit, OnDestroy {

  expansionPermutationSubscription: Subscription;
  expansionPermutation: String;

  constructor(private encryptionService: EncryptionService) { }

  ngOnInit() {
    this.expansionPermutationSubscription = this.encryptionService.expansionPermutation.subscribe(data => this.expansionPermutation = data.join(''));
  }

  ngOnDestroy() {
    this.expansionPermutationSubscription.unsubscribe();
  }

}
