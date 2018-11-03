import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from '../../../../../node_modules/rxjs';
import { EncryptionService } from '../../encryption.service';

@Component({
  selector: 'app-outer-permutation',
  templateUrl: './outer-permutation.component.html',
  styleUrls: ['./outer-permutation.component.css']
})
export class OuterPermutationComponent implements OnInit, OnDestroy {

  outerPermutation: String;
  outerPermutationSubscription: Subscription;

  constructor(private encryptionService: EncryptionService) { }

  ngOnInit() {
    this.outerPermutationSubscription = this.encryptionService.outerPermutation.subscribe(
      data => this.outerPermutation = data.join('')
    );
  }

  ngOnDestroy() {
    this.outerPermutationSubscription.unsubscribe();
  }

}
