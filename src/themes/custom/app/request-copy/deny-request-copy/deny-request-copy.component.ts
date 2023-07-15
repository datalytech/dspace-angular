import { Component } from '@angular/core';
import {
    DenyRequestCopyComponent as BaseComponent
} from 'src/app/request-copy/deny-request-copy/deny-request-copy.component';
import { TranslateModule } from '@ngx-translate/core';
import { ThemedLoadingComponent } from '../../../../../app/shared/loading/themed-loading.component';
import { ThemedEmailRequestCopyComponent } from '../../../../../app/request-copy/email-request-copy/themed-email-request-copy.component';
import { NgIf, AsyncPipe } from '@angular/common';
import { VarDirective } from '../../../../../app/shared/utils/var.directive';

@Component({
    selector: 'ds-deny-request-copy',
    // styleUrls: ['./deny-request-copy.component.scss'],
    styleUrls: [],
    // templateUrl: './deny-request-copy.component.html',
    templateUrl: './../../../../../app/request-copy/deny-request-copy/deny-request-copy.component.html',
    standalone: true,
    imports: [VarDirective, NgIf, ThemedEmailRequestCopyComponent, ThemedLoadingComponent, AsyncPipe, TranslateModule]
})
export class DenyRequestCopyComponent
    extends BaseComponent {
}
