import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmAccountRoutingModule } from './confirm-account-routing.module';
import { ConfirmAccountComponent } from './confirm-account.component';

@NgModule({
  declarations: [ConfirmAccountComponent],
  imports: [
    CommonModule,
    ConfirmAccountRoutingModule
  ]
})
export class ConfirmAccountModule { }
