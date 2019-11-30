import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgMatFormFields, NgMatSelectListFromUrl } from './interfaces/index';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type formValue = {
    [key: string]: string
}

@Injectable({
    providedIn: 'root'
})
export class NgMatFormsService {
    FormGen: FormGroup;
    Fields: NgMatFormFields[];
    constructor(private httpClient: HttpClient) { }

    readonly setControlValue: any = (formControlName: string, value: any) => {
        this.replaceValue(formControlName, value).then((val) => {
            this.FormGen.patchValue({ [formControlName]: val });
        });
    };

    readonly setFormValue: any = (obj: formValue) => {
        Object.keys(obj).forEach(x => {
            this.setControlValue(x, obj[x]);
        });
    };

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
    };

    readonly setControlDisable = (formControlName: string) => {
        this.FormGen.get(formControlName).disable({ onlySelf: true });
    };

    readonly setControlEnable = (formControlName: string) => {
        this.FormGen.get(formControlName).enable({ onlySelf: true });
    };

    readonly setValidator = (formControlName: string, validators: any) => {
        this.FormGen.get(formControlName).clearValidators();
        this.FormGen.get(formControlName).updateValueAndValidity({ onlySelf: true });
        this.FormGen.get(formControlName).setValidators(validators);
    };

    readonly removeValidator = (formControlName: string) => {
        this.FormGen.get(formControlName).clearValidators();
        this.FormGen.get(formControlName).updateValueAndValidity({ onlySelf: true });
    };

    readonly getData = (data: NgMatSelectListFromUrl): Observable<any> => {
        if (data.method === 'get') {
            return this.httpClient.get(data.url, { headers: data.header, params: data.params, responseType: 'json' });
        } else if (data.method === 'post') {
            return this.httpClient.post(data.url, data.params, { headers: data.header, responseType: 'json' });
        }
    };

}

/* @Component({
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

} */

