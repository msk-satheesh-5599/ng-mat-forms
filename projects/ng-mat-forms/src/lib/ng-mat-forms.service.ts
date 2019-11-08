import { Injectable, Input, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { fields } from './interfaces/fields.interface';

export type formValue = {
    [key: string]: string
}

@Injectable({
    providedIn: 'root'
})
export class NgMatFormsService {
    FormGen: FormGroup;
    Fields: fields[];
    constructor() { }

    readonly setValue: any = (formControlName: string, value: any) => {
        this.replaceValue(formControlName, value).then((val) => {
            this.FormGen.patchValue({ [formControlName]: val });
        });
    }

    readonly patchValue: any = (obj: formValue) => {
        Object.keys(obj).map(x => {
            this.setValue(x, obj[x]);
        });
    }

    readonly replaceValue = (...params) => {
        return new Promise((resolve) => {
            let field: any = this.Fields.find(x => x.formControlName == params[0]);
            if (field.hasOwnProperty('directive')) {
                switch (field.directive) {
                    case "numericOnly":
                        params[1] = params[1].replace(/[a-zA-Z]*/g, '');
                        break;
                    case "alphabetOnly":
                        params[1] = params[1].replace(/[0-9]*/g, '').replace(/[^\w\s]/gi, '');
                        break;
                    case "alphanumericOnly":
                        params[1] = params[1].replace(/[^\w\s]/gi, '');
                        break;
                    case "custom":
                        params[1] = params[1].replace(field.regex, '');
                        break;
                }
            }
            resolve(params[1]);
        });
    }

    readonly setControlDisable = (formControlName: string) => {
        this.FormGen.get(formControlName).disable({ onlySelf: true });
    }

    readonly setControlEnable = (formControlName: string) => {
        this.FormGen.get(formControlName).enable({ onlySelf: true });
    }

    readonly setRequiredValidator = (formControlName: string) => {
        this.FormGen.get(formControlName).clearValidators();
        this.FormGen.get(formControlName).updateValueAndValidity({ onlySelf: true });
        this.FormGen.get(formControlName).setValidators([Validators.required]);
    }

    readonly removeRequiredValidator = (formControlName: string) => {
        this.FormGen.get(formControlName).clearValidators();
        this.FormGen.get(formControlName).updateValueAndValidity({ onlySelf: true });
    }

}

@Component({
    selector: 'error-message',
    template: `<p class='error' *ngIf='control.hasError'>{{getErrorMessages}}</p>`,
    styles: [
        `.error{
            color: #f44336;
        }`
    ]
})
export class ErrorMessageComponent {

    @Input() control: FormControl;
    @Input() Field: string;
    constructor() { }

    getErrorMessage() {
        if (this.control.hasError) {
            if (this.control.errors != null) {
                let error = Object.keys(this.control.errors)[0];
                return this.getErrorMessageField(error, this.control.errors[error]);
            }
            return '';
        }
    }

    getErrorMessageField(errors: string, obj: any) {
        let config = {
            required: `${this.Field} is required`,
            minlength: `Minimun Length for ${this.Field} is ${obj.requiredLength}`
        }
        return config[errors];
    }

}

