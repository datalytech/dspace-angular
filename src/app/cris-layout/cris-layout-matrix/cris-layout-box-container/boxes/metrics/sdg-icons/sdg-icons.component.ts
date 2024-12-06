import { Component, inject } from '@angular/core';
import { SdgIconsService } from 'src/app/core/shared/sdg-icons.service';

@Component({
  selector: 'ds-sdg-icons',
  templateUrl: './sdg-icons.component.html',
  styleUrls: ['./sdg-icons.component.scss'],
})
export class SdgIconsComponent {
  sdgIconsService = inject(SdgIconsService);
}
