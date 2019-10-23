import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface Fields {
    type: type;
    label: string;
    placeholder: string;
    formControlName: string;
    directive?: directive;
    regex?: RegExp;
    defaultValue?: string;
    validators?: Array<Validators>;
    list?: Array<SelectList>;
}

export interface SelectList { name: string; value: string; }

export enum directive { Alpha, AlphaNumeric, Numeric, Custom }

export enum type { Input, Select, Radio }


@Component({
    selector: 'ng-mat-forms',
    templateUrl: 'ng-mat-forms.component.html',
    styles: []
})
export class NgMatFormsComponent implements OnInit {

    @Input() Fields: Array<Fields> = [];
    @Input() Column: any;
    FormGen: FormGroup;
    @Output() getFormValue: EventEmitter<any> = new EventEmitter();
    @Output() onChange: EventEmitter<any> = new EventEmitter();
    @Output() formChange: EventEmitter<any> = new EventEmitter();
    breakpoint: any;
    inputType: type;

    constructor() {
        setTimeout(() => {
            this.prepareDirective();
        }, 1000);
        this.breakpoint = (window.innerWidth <= 400) ? 1 :
            ((window.innerWidth <= 700) ? 2 : this.Column);
    }

    onResize(event) {
        this.breakpoint = (event.target.innerWidth <= 400) ? 1 :
            ((event.target.innerWidth <= 700) ? 2 : this.Column);
    }

    ngOnInit() {
        this.FormGen = this.createForm();
        this.FormGen.valueChanges.subscribe(value => {
            this.formChange.emit(value);
        });
    }

    createForm(): FormGroup {
        const job = new FormGroup({});
        this.Fields.map(x => {
            let validators: any = x.validators;
            const control: FormControl = new FormControl(x.defaultValue, validators);
            job.addControl(x.formControlName, control);
        });
        return job;
    }

    valueChange(formControlName: string) {
        this.onChange.emit({ controlName: formControlName, value: this.FormGen.get(formControlName).value });
    }

    submit() {
        this.getFormValue.emit(this.FormGen.value);
    }

    setValue(formControlName: string, value: any) {
    }

    trackByFormControlName(index: number, field: any): string {
        return field.formControlName;
    }

    prepareDirective() {
        if (this.Fields.length > 0) {
            this.Fields.forEach((item, i) => {
                this.Fields[i]['alpha'] = (item.directive === directive.Alpha);
                this.Fields[i]['input'] = (item.type === type.Input);
                this.Fields[i]['select'] = (item.type === type.Select);
                this.Fields[i]['radio'] = (item.type === type.Radio);
                console.warn((item.directive === directive.Numeric));
                this.Fields[i]['numeric'] = (item.directive === directive.Numeric);
                this.Fields[i]['alphanumeric'] = (item.directive === directive.AlphaNumeric);
                this.Fields[i]['custom'] = (item.directive === directive.Custom);
                this.Fields[i]['reGex'] = item.regex;
            });
        }
    }

    getErrorMessage(control, fieldName) {
        if (control.hasError) {
            if (control.errors != null) {
                let error = Object.keys(control.errors)[0];
                return this.getErrorMessageField(error, control.errors[error], fieldName);
            }
            return '';
        }
    }

    getErrorMessageField(errors: string, obj: any, fieldName: string) {
        let config = {
            required: `${fieldName} is required`,
            minlength: `Minimun Length for ${fieldName} is ${obj.requiredLength}`
        }
        return config[errors];
    }
}




