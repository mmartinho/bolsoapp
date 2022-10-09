import { AbstractControl } from '@angular/forms';

export class LowerCaseValidator {
    static lowercase(control: AbstractControl) {
        if(control.value.trim() && !(/^[a-z0-9_\-]+$/.test(control.value))) {
            return {
                lowercase: true
            }
        }
        return null;
    }
}
