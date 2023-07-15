import { Component } from '@angular/core';
import { TYPE_REQUEST_REGISTER, RegisterEmailFormComponent } from '../../register-email-form/register-email-form.component';

@Component({
    selector: 'ds-register-email',
    styleUrls: ['./register-email.component.scss'],
    templateUrl: './register-email.component.html',
    standalone: true,
    imports: [RegisterEmailFormComponent]
})
/**
 * Component responsible the email registration step when registering as a new user
 */
export class RegisterEmailComponent {
  typeRequest = TYPE_REQUEST_REGISTER;
}
