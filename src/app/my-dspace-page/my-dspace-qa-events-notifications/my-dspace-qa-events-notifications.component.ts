import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { QualityAssuranceSourceDataService } from '../../core/suggestion-notifications/qa/source/quality-assurance-source-data.service';
import { getFirstCompletedRemoteData, getPaginatedListPayload, getRemoteDataPayload } from '../../core/shared/operators';
import { Observable, of, tap } from 'rxjs';
import { QualityAssuranceSourceObject } from 'src/app/core/suggestion-notifications/qa/models/quality-assurance-source.model';

@Component({
  selector: 'ds-my-dspace-qa-events-notifications',
  templateUrl: './my-dspace-qa-events-notifications.component.html',
  styleUrls: ['./my-dspace-qa-events-notifications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyDspaceQaEventsNotificationsComponent  implements OnInit {

  /**
   * An Observable that emits an array of QualityAssuranceSourceObject.
   */
  sources$: Observable<QualityAssuranceSourceObject[]> = of([]);

  constructor(private qualityAssuranceSourceDataService: QualityAssuranceSourceDataService) { }

  ngOnInit(): void {
    this.getSources();
  }

  /**
   * Retrieves the sources for Quality Assurance.
   * @returns An Observable of the sources for Quality Assurance.
   * @throws An error if the retrieval of Quality Assurance sources fails.
   */
  getSources() {
    this.sources$ = this.qualityAssuranceSourceDataService.getSources()
    .pipe(
      getFirstCompletedRemoteData(),
      tap((rd) => {
        if (rd.hasFailed) {
          throw new Error('Can\'t retrieve Quality Assurance sources');
        }
      }),
      getRemoteDataPayload(),
      getPaginatedListPayload(),
    );
  }
}