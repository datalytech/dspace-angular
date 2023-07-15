import { Component } from '@angular/core';
import { FooterComponent as BaseComponent } from '../../../../app/footer/footer.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { NgIf, AsyncPipe, DatePipe } from '@angular/common';

@Component({
    selector: 'ds-footer',
    // styleUrls: ['footer.component.scss'],
    styleUrls: ['../../../../app/footer/footer.component.scss'],
    // templateUrl: 'footer.component.html'
    templateUrl: '../../../../app/footer/footer.component.html',
    standalone: true,
    imports: [NgIf, RouterLink, AsyncPipe, DatePipe, TranslateModule]
})
export class FooterComponent extends BaseComponent {
}
