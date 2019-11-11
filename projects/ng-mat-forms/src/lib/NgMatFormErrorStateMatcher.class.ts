import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl } from '@angular/forms';

export class NgMatFormErrorStateMatcher implements ErrorStateMatcher {
    private updateOnSubmit: boolean = true;
    private formSubmit: boolean = false;

    isErrorState(control: FormControl | null, form: null): boolean {
        return (!this.updateOnSubmit ? (!!(control && control.invalid && (control.touched && this.formSubmit))) :
            (!!(control && control.invalid && (control.touched || control.dirty))));
    }

    setupdateOnSubmit(...arg) {
        arg[0] == 'options' ? this.updateOnSubmit = arg[1] : this.formSubmit = arg[1];
    }
}