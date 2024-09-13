import { Component, OnDestroy, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { Operation } from "fast-json-patch";
import { Subscription } from "rxjs";
import { ScriptDataService } from "../../core/data/processes/script-data.service";
import { SiteDataService } from "../../core/data/site-data.service";
import { Site } from "../../core/shared/site.model";
import { NotificationsService } from "../../shared/notifications/notifications.service";
import { environment } from "../../../environments/environment";
import { getFirstCompletedRemoteData } from "../../core/shared/operators";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  AdminBibliometrisServive,
  QueryParam,
} from "./admin-bibliometris.service";

/**
 * Component that represents the user agreement edit page for administrators.
 */
@Component({
  selector: "ds-admin-bibliometris",
  templateUrl: "./admin-bibliometris.component.html",
  styleUrls: ["./admin-bibliometris.component.scss"],
})
export class AdminBibliometrisComponent implements OnInit, OnDestroy {
  userAgreementTexts: Map<string, UserAgreementText> = new Map();
  site: Site;

  subs: Subscription[] = [];

  USER_AGREEMENT_TEXT_METADATA = "dc.rights";

  USER_AGREEMENT_METADATA = "dspace.agreements.end-user";
  
  importProgress$ = this.adminBibliometrisServive.importProgressInfo$;

  constructor(
    private siteService: SiteDataService,
    private modalService: NgbModal,
    private translateService: TranslateService,
    private notificationsService: NotificationsService,
    private scriptDataService: ScriptDataService,
    private fb: FormBuilder,
    private adminBibliometrisServive: AdminBibliometrisServive
  ) {}

  myForm = this.fb.group({
    exportApi: ["/api/authors/rp00036/export", Validators.required],
    email: ["kostisalex@gmail.com", [Validators.required, Validators.email]],
    publish: [false, Validators.required],
  });

  ngOnInit(): void {
    environment.languages
      .filter((language) => language.active)
      .forEach((language) => {
        this.userAgreementTexts.set(language.code, {
          languageLabel: language.label,
          text: "",
        });
      });

    this.subs.push(
      this.siteService.find().subscribe((site) => {
        this.site = site;
        for (const metadata of site.metadataAsList) {
          if (metadata.key === this.USER_AGREEMENT_TEXT_METADATA) {
            const userAgreementText = this.userAgreementTexts.get(
              metadata.language
            );
            if (userAgreementText != null) {
              userAgreementText.text = metadata.value;
            }
          }
        }
      })
    );
  }

  onSubmit() {
    if (this.myForm.invalid) {
      // show notification that the form is not valid
      return;
    };

    const queryParams: QueryParam[] = this.constructQueryParamsFromForm();

    this.adminBibliometrisServive.batchImport(queryParams);
  }
  
  // auto na mpei sto observable sto service kai na to fernei etoimo
  parseLogs(logs) {
    return logs.map(log => {
      const parts = log.split('::');
      return {
        number: parts[0] ? parts[0].trim() : '',
        status: parts[1] ? parts[1].trim() : '',
        id: parts[2] ? parts[2].trim() : '',
        message: parts[3] ? parts[3].trim() : ''
      };
    });
  }

  /**
   * Show the confirm modal to choose if  all users must be forced to accept the new user agreement or not.
   * @param content the modal content
   */
  confirmEdit(content: any) {
    this.modalService.open(content).result.then((result) => {
      if (result === "cancel") {
        return;
      }
      const operations = this.getOperationsToEditText();
      this.subs.push(
        this.siteService
          .patch(this.site, operations)
          .pipe(getFirstCompletedRemoteData())
          .subscribe((restResponse) => {
            if (restResponse.isSuccess) {
              this.notificationsService.success(
                this.translateService.get("admin.edit-user-agreement.success")
              );
              if (result === "edit-with-reset") {
                this.deleteAllUserAgreementMetadataValues();
              }
            } else {
              this.notificationsService.error(
                this.translateService.get("admin.edit-user-agreement.error")
              );
            }
          })
      );
    });
  }

  /**
   * Returns the operations to update the user agreement text metadata.
   */
  private getOperationsToEditText(): Operation[] {
    const firstLanguage = this.userAgreementTexts.keys().next().value;
    const operations = [];
    operations.push({
      op: "replace",
      path: "/metadata/" + this.USER_AGREEMENT_TEXT_METADATA,
      value: {
        value: this.userAgreementTexts.get(firstLanguage).text,
        language: firstLanguage,
      },
    });
    this.userAgreementTexts.forEach((value, key) => {
      if (key !== firstLanguage) {
        operations.push({
          op: "add",
          path: "/metadata/" + this.USER_AGREEMENT_TEXT_METADATA,
          value: {
            value: value.text,
            language: key,
          },
        });
      }
    });
    return operations;
  }

  /**
   * Invoke the script to delete all the the user agreement text metadata values.
   */
  private deleteAllUserAgreementMetadataValues() {
    this.subs.push(
      this.scriptDataService
        .invoke(
          "metadata-deletion",
          [{ name: "-metadata", value: this.USER_AGREEMENT_METADATA }],
          []
        )
        .subscribe()
    );
  }

  private constructQueryParamsFromForm(): QueryParam[] {
    const queryParams: QueryParam[] = [];
    const formValue = this.myForm.getRawValue();

    for (let key in formValue) {
      queryParams.push({ key, value: formValue[key] });
    }

    return queryParams;
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}

interface UserAgreementText {
  languageLabel: string;
  text: string;
}
