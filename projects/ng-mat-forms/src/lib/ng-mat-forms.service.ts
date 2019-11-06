import { Injectable, Input, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { fields } from './interfaces/fields.interface';

@Injectable({
    providedIn: 'root',
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

    readonly replaceValue = (key, value) => {
        return new Promise((resolve) => {
            let field: any = this.Fields.find(x => x.formControlName == key);
            if (field.hasOwnProperty('directive')) {
                switch (field.directive) {
                    case "numericOnly":
                        value = value.replace(/[a-zA-Z]*/g, '');
                        break;
                    case "alphabetOnly":
                        value = value.replace(/[0-9]*/g, '').replace(/[^\w\s]/gi, '');
                        break;
                    case "alphanumericOnly":
                        value = value.replace(/[^\w\s]/gi, '');
                        break;
                    case "custom":
                        value = value.replace(field.regex, '');
                        break;
                }
            }
            resolve(value);
        });
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

