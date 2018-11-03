import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { KeyComponent } from './key/key.component';
import { HeaderComponent } from './header/header.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AppRoutingModule } from './app-routing.module';
import { EncryptionComponent } from './encryption/encryption.component';
import { BinaryService } from './binary.service';
import { KeyPipe } from './key/key.pipe';
import { EncryptionService } from './encryption/encryption.service';
import { KeyService } from './key/key.service';
import { ValidatorService } from './shared/validator.service';
import { KeyGenerator } from './shared/key-generator.service';
import { PermutedChoiceOneComponent } from './key/permuted-choice-one/permuted-choice.component';
import { LeftComponent } from './key/left/left.component';
import { RightComponent } from './key/right/right.component';
import { RightShiftComponent } from './key/right-shift/right-shift.component';
import { LeftShiftComponent } from './key/left-shift/left-shift.component';
import { CombineComponent } from './key/combine/combine.component';
import { PermutedChoiceTwoComponent } from './key/permuted-choice-two/permuted-choice-two.component';
import { L0Component } from './encryption/l0/l0.component';
import { R0Component } from './encryption/r0/r0.component';
import { FFunctionComponent } from './encryption/f-function/f-function.component';
import { InitialPermutationComponent } from './encryption/initial-permutation/initial-permutation.component';
import { ExpansionPermutationComponent } from './encryption/f-function/expansion-permutation/expansion-permutation.component';
import { XorComponent } from './encryption/f-function/xor/xor.component';
import { SBoxComponent } from './encryption/f-function/s-box/s-box.component';
import { OuterPermutationComponent } from './encryption/f-function/outer-permutation/outer-permutation.component';
import { OuterXorComponent } from './encryption/outer-xor/outer-xor.component';
import { EndOfRoundComponent } from './encryption/end-of-round/end-of-round.component';

@NgModule({
  declarations: [
    AppComponent,
    KeyComponent,
    HeaderComponent,
    WelcomeComponent,
    EncryptionComponent,
    KeyPipe,
    PermutedChoiceOneComponent,
    LeftComponent,
    RightComponent,
    RightShiftComponent,
    LeftShiftComponent,
    CombineComponent,
    PermutedChoiceTwoComponent,
    L0Component,
    R0Component,
    ExpansionPermutationComponent,
    FFunctionComponent,
    InitialPermutationComponent,
    XorComponent,
    SBoxComponent,
    OuterPermutationComponent,
    OuterXorComponent,
    EndOfRoundComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [BinaryService, EncryptionService, KeyService, ValidatorService, KeyGenerator],
  bootstrap: [AppComponent]
})
export class AppModule { }
