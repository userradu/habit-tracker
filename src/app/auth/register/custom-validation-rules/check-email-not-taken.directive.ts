import { AbstractControl } from '@angular/forms';
import { map, catchError, switchMap } from 'rxjs/operators';
import { timer, of } from 'rxjs';
import { CheckEmailService } from 'src/app/shared/services/check-email.service';

export class CheckEmailNotTakenValidator {
    static createValidator(checkEmailService: CheckEmailService) {
        return (control: AbstractControl) => {
            return timer(500).pipe(
                switchMap(() => checkEmailService.checkEmailExists(control.value)),
                map(result => (result.emailExists ? { emailTaken: true } : null)),
                catchError(() => of(null))
            );
        };
    }
}