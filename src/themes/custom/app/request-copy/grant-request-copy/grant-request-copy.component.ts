import { Component } from '@angular/core';
import {
    GrantRequestCopyComponent as BaseComponent
} from 'src/app/request-copy/grant-request-copy/grant-request-copy.component';
import { TranslateModule } from '@ngx-translate/core';
import { ThemedLoadingComponent } from '../../../../../app/shared/loading/themed-loading.component';
import { FormsModule } from '@angular/forms';
import { ThemedEmailRequestCopyComponent } from '../../../../../app/request-copy/email-request-copy/themed-email-request-copy.component';
import { NgIf, AsyncPipe } from '@angular/common';
import { VarDirective } from '../../../../../app/shared/utils/var.directive';

@Component({
    selector: 'ds-grant-request-copy',
    // styleUrls: ['./grant-request-copy.component.scss'],
    styleUrls: [],
    // templateUrl: './grant-request-copy.component.html',
    templateUrl: './../../../../../app/request-copy/grant-request-copy/grant-request-copy.component.html',
    standalone: true,
    imports: [VarDirective, NgIf, ThemedEmailRequestCopyComponent, FormsModule, ThemedLoadingComponent, AsyncPipe, TranslateModule]
})
export class GrantRequestCopyComponent
    extends BaseComponent {
}
