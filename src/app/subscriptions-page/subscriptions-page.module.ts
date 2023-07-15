import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionsPageComponent } from './subscriptions-page.component';
import { SharedModule } from '../shared/shared.module';
import { SubscriptionsModule } from '../shared/subscriptions/subscriptions.module';
import { AlertComponent } from "@dspace/shared/ui";

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        SubscriptionsModule,
        AlertComponent,
        SubscriptionsPageComponent
    ]
})
export class SubscriptionsPageModule { }
