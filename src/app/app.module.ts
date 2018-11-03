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

@NgModule({
  declarations: [
    AppComponent,
    KeyComponent,
    HeaderComponent,
    WelcomeComponent,
    EncryptionComponent,
    KeyPipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [BinaryService, EncryptionService, KeyService, ValidatorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
