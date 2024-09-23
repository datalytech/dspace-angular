import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Operation } from 'fast-json-patch';
import { Subscription } from 'rxjs';
import { ScriptDataService } from '../../core/data/processes/script-data.service';
import { SiteDataService } from '../../core/data/site-data.service';
import { Site } from '../../core/shared/site.model';
import { NotificationsService } from '../../shared/notifications/notifications.service';
import { environment } from '../../../environments/environment';
import { getFirstCompletedRemoteData } from '../../core/shared/operators';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { saveAs } from 'file-saver';

/**
 * Component that represents the user agreement edit page for administrators.
 */
@Component({
  selector: 'ds-admin-report',
  templateUrl: './admin-report.component.html',

})
export class AdminReportComponent implements OnInit, OnDestroy {

  userAgreementTexts: Map<string,UserAgreementText> = new Map();
  site: Site;

  subs: Subscription[] = [];

  USER_AGREEMENT_TEXT_METADATA = 'dc.rights';

  USER_AGREEMENT_METADATA = 'dspace.agreements.end-user';


        startDate: string | null = null;
        endDate: string | null = null;

  submitForm() {
    console.log('Start Date:', this.startDate);
    console.log('End Date:', this.endDate);

const params = new HttpParams()
        .set('startDate', this.startDate)
        .set('endDate', this.endDate);

      // Make the GET request
      //this.http.get('http://dspace:8080/server/api/core/usage-statistics', { params })
      //  .subscribe(response => {
      //    console.log('Response:', response);
      //  }, error => {
      //    console.error('Error:', error);
      //  });

       this.http.get('https://ucy.dataly.gr/server/api/core/usage-statistics', {
        params: params,
        responseType: 'blob'  // Tell Angular this request returns a Blob (binary data)
      }).subscribe(blob => {
        // Create a new Blob object (the downloaded Excel file)
        const excelBlob = new Blob([blob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        // Use FileSaver to trigger the download
        saveAs(excelBlob, `report_usage.xlsx`);
      }, error => {
        console.error('Error downloading the file:', error);
      });
  }

  constructor(private siteService: SiteDataService,
              private modalService: NgbModal,
              private translateService: TranslateService,
              private notificationsService: NotificationsService,
              private scriptDataService: ScriptDataService,
             private http: HttpClient ) {

  }

  ngOnInit(): void {

    environment.languages.filter((language) => language.active)
      .forEach((language) => {
        this.userAgreementTexts.set( language.code, {
          languageLabel: language.label,
          text: ''
        });
      });

    this.subs.push(this.siteService.find().subscribe((site) => {
      this.site = site;
      for (const metadata of site.metadataAsList) {
        if (metadata.key === this.USER_AGREEMENT_TEXT_METADATA) {
          const userAgreementText = this.userAgreementTexts.get(metadata.language);
          if (userAgreementText != null) {
            userAgreementText.text = metadata.value;
          }
        }
      }
    }));
  }

  /**
   * Show the confirm modal to choose if  all users must be forced to accept the new user agreement or not.
   * @param content the modal content
   */
  confirmEdit(content: any) {
    this.modalService.open(content).result.then( (result) => {
      if (result === 'cancel') {
        return;
      }
      const operations = this.getOperationsToEditText();
      this.subs.push(this.siteService.patch(this.site, operations).pipe(
        getFirstCompletedRemoteData(),
      ).subscribe((restResponse) => {
        if (restResponse.hasSucceeded) {
          this.notificationsService.success(this.translateService.get('admin.edit-user-agreement.success'));
          if ( result === 'edit-with-reset' ) {
            this.deleteAllUserAgreementMetadataValues();
          }
        } else {
          this.notificationsService.error(this.translateService.get('admin.edit-user-agreement.error'));
        }
      }));
    });
  }

  /**
   * Returns the operations to update the user agreement text metadata.
   */
  private getOperationsToEditText(): Operation[] {
    const firstLanguage = this.userAgreementTexts.keys().next().value;
    const operations = [];
    operations.push({
      op: 'replace',
      path: '/metadata/' + this.USER_AGREEMENT_TEXT_METADATA,
      value: {
        value: this.userAgreementTexts.get(firstLanguage).text,
        language: firstLanguage
      }
    });
    this.userAgreementTexts.forEach((value, key) => {
      if (key !== firstLanguage) {
        operations.push({
          op: 'add',
          path: '/metadata/' + this.USER_AGREEMENT_TEXT_METADATA,
          value: {
            value: value.text,
            language: key
          }
        });
      }
    });
    return operations;
  }

  /**
   * Invoke the script to delete all the the user agreement text metadata values.
   */
  private deleteAllUserAgreementMetadataValues() {
    this.subs.push(this.scriptDataService.invoke('metadata-deletion', [{name: '-metadata', value: this.USER_AGREEMENT_METADATA}], []).subscribe());
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

}

interface UserAgreementText {
  languageLabel: string;
  text: string;
}





