import { Component, ChangeDetectionStrategy, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExternalLoginService } from '../../services/external-login.service';
import { Subscription } from 'rxjs';
import { hasValue } from '../../../../shared/empty.util';

@Component({
  selector: 'ds-provide-email',
  templateUrl: './provide-email.component.html',
  styleUrls: ['./provide-email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProvideEmailComponent implements OnDestroy {
  /**
   * The form group for the email input
   */
  emailForm: FormGroup;
  /**
   * The registration id
   */
  @Input() registrationId: string;
  /**
   * The token from the URL
   */
  @Input() token: string;
  /**
   * The subscriptions to unsubscribe from
   */
  subs: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private externalLoginService: ExternalLoginService,
  ) {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  /**
   * Updates the user's email in the registration data.
   * @returns void
   */
  submitForm() {
    this.emailForm.markAllAsTouched();
    if (this.emailForm.valid) {
      const email = this.emailForm.get('email').value;
      this.subs.push(this.externalLoginService.patchUpdateRegistration([email], 'email', this.registrationId, this.token, 'add')
        .subscribe());
    }
  }

  ngOnDestroy(): void {
    this.subs.filter(sub => hasValue(sub)).forEach((sub) => sub.unsubscribe());
  }
}
