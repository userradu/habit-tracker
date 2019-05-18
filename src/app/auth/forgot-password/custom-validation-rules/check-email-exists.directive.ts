import { AbstractControl } from '@angular/forms';
import { map, catchError, switchMap } from 'rxjs/operators';
import { timer, of } from 'rxjs';
import { CheckEmailService } from 'src/app/shared/services/check-email.service';

export class CheckEmailExistsValidator {
    static createValidator(checkEmailService: CheckEmailService) {
        return (control: AbstractControl) => {
            return timer(500).pipe(
                switchMap(() => checkEmailService.checkEmailExists(control.value)),
                map(result => (!result.emailExists ? { emailNotRegistered: true } : null)),
                catchError(() => of(null))
            );
        };
    }
}