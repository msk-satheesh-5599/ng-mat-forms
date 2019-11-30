import { Validators } from '@angular/forms';

export interface FieldValidatorModel {
    formControlName: string;
    validators: Array<Validators>;
}

export interface FieldValueModel {
    formControlName: string;
    value: string | number;
}

export interface NgMatFormFieldChanges {
    value: any;
    disable?: Array<string>;
    enable?: Array<string>;
    setValidators?: Array<FieldValidatorModel>;
    removeValidators?: Array<string>;
    setValue?: Array<FieldValueModel>;
}
