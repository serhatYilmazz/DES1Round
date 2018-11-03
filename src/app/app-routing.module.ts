import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from "./welcome/welcome.component";
import { KeyComponent } from "./key/key.component";
import { EncryptionComponent } from "./encryption/encryption.component";

const appRoutes: Routes = [
    { path: '', component: WelcomeComponent },
    { path: 'key', component: KeyComponent },
    { path: 'message', component: EncryptionComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}