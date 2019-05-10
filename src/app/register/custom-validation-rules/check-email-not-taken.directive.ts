import { AbstractControl } from '@angular/forms';
import { RegisterService } from '../register.service';
import { map, catchError, switchMap } from 'rxjs/operators';
import { timer, of } from 'rxjs';

export class CheckEmailNotTakenValidator {
    static createValidator(registerService: RegisterService) {
        return (control: AbstractControl) => {
            return timer(500).pipe(
                switchMap(() => registerService.checkEmailNotTaken(control.value)),
                map(result => (result.emailTaken ? { emailTaken: true } : null)),
                catchError(() => of(null))
            );
        };
    }
}