import { Component, ChangeDetectionStrategy, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExternalLoginService } from '../../services/external-login.service';
import { getFirstCompletedRemoteData, getRemoteDataPayload } from '../../../../core/shared/operators';
import { EPersonDataService } from '../../../../core/eperson/eperson-data.service';
import { hasNoValue, hasValue } from '../../../../shared/empty.util';
import { EPerson } from '../../../../core/eperson/models/eperson.model';
import { RemoteData } from '../../../../core/data/remote-data';
import { NotificationsService } from '../../../../shared/notifications/notifications.service';
import { TranslateService } from '@ngx-translate/core';
import isEqual from 'lodash/isEqual';
import { AuthService } from '../../../../core/auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Registration } from '../../../../core/shared/registration.model';

@Component({
  selector: 'ds-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmEmailComponent implements OnDestroy {
  /**
   * The form containing the email input
   */
  emailForm: FormGroup;
  /**
   * The registration data object
   */
  @Input() registrationData: Registration;

  /**
   * The token to be used to confirm the registration
   */
  @Input() token: string;
  /**
   * The subscriptions to unsubscribe from
   */
  subs: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private externalLoginService: ExternalLoginService,
    private epersonDataService: EPersonDataService,
    private notificationService: NotificationsService,
    private translate: TranslateService,
    private authService: AuthService,
    private router: Router
  ) {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }


  /**
   * Submits the email form and performs appropriate actions based on the form's validity and user input.
   * If the form is valid and the confirmed email matches the registration email, calls the postCreateAccountFromToken method with the token and registration data.
   * If the form is valid but the confirmed email does not match the registration email, calls the patchUpdateRegistration method with the confirmed email.
   */
  submitForm() {
    this.emailForm.markAllAsTouched();
    if (this.emailForm.valid) {
      const confirmedEmail = this.emailForm.get('email').value;
      if (confirmedEmail && isEqual(this.registrationData.email, confirmedEmail.trim())) {
        this.postCreateAccountFromToken(this.token, this.registrationData);
      } else {
        this.patchUpdateRegistration([confirmedEmail]);
      }
    }
  }

  /**
   * Sends a PATCH request to update the user's registration with the given values.
   * @param values - The values to update the user's registration with.
   * @returns An Observable that emits the updated registration data.
   */
  private patchUpdateRegistration(values: string[]) {
    this.subs.push(
      this.externalLoginService.patchUpdateRegistration(values, 'email', this.registrationData.id, this.token, 'replace')
        .pipe(getRemoteDataPayload())
        .subscribe());
  }

  /**
    * Creates a new user from a given token and registration data.
    * Based on the registration data, the user will be created with the following properties:
    * - email: the email address from the registration data
    * - metadata: all metadata values from the registration data, except for the email metadata key (ePerson object does not have an email metadata field)
    * - canLogIn: true
    * - requireCertificate: false
    * @param token The token used to create the user.
    * @param registrationData The registration data used to create the user.
    * @returns An Observable that emits a boolean indicating whether the user creation was successful.
    */
  private postCreateAccountFromToken(
    token: string,
    registrationData: Registration
  ) {
    // check if the netId is present
    // in order to create an account, the netId is required (since the user is created without a password)
    if (hasNoValue(this.registrationData.netId)) {
      this.notificationService.error(this.translate.get('external-login-page.confirm-email.create-account.notifications.error.no-netId'));
      return;
    }

    const metadataValues = {};
    for (const [key, value] of Object.entries(registrationData.registrationMetadata)) {
      if (hasValue(value[0]?.value) && key !== 'email') {
        metadataValues[key] = value;
      }
    }
    const eperson = new EPerson();
    eperson.email = registrationData.email;
    eperson.netid = registrationData.netId;
    eperson.metadata = metadataValues;
    eperson.canLogIn = true;
    eperson.requireCertificate = false;
    eperson.selfRegistered = true;
    this.subs.push(
      this.epersonDataService.createEPersonForToken(eperson, token).pipe(
        getFirstCompletedRemoteData(),
      ).subscribe((rd: RemoteData<EPerson>) => {
        if (rd.hasFailed) {
          this.notificationService.error(
            this.translate.get('external-login-page.provide-email.create-account.notifications.error.header'),
            this.translate.get('external-login-page.provide-email.create-account.notifications.error.content')
          );
        } else if (rd.hasSucceeded) {
          // redirect to login page with authMethod query param, so that the login page knows which authentication method to use
          // set Redirect URL to User profile, so the user is redirected to the profile page after logging in
          this.router.navigate(['/login'], { queryParams: { authMethod: registrationData.registrationType } });
          this.authService.setRedirectUrl('/profile');
        }
      }));
  }

  ngOnDestroy(): void {
    this.subs.filter(sub => hasValue(sub)).forEach((sub) => sub.unsubscribe());
  }
}
