import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface Fields {
    type: FieldType;
    label: string;
    placeholder: string;
    formControlName: string;
    directive?: Directive;
    regex?: RegExp;
    defaultValue?: string;
    validators?: Array<Validators>;
    list?: Array<SelectList>;
}

export interface SelectList {
    name: string;
    value: string;
    formControlName?: string;
}

export enum Directive {
    Alpha = 'alpha',
    AlphaNumeric = 'alphanumeric',
    Numeric = 'numeric',
    Custom = 'custom'
}

export enum FieldType {
    Input = 'input',
    Select = 'select',
    Radio = 'radio',
    MultiSelect = 'multiSelect',
    CheckBox = 'checkBox'
}


@Component({
    selector: 'ng-mat-forms',
    templateUrl: 'ng-mat-forms.component.html',
    styles: [`
        .mat-radio-button ~ .mat-radio-button {
            margin-left: 16px;
        }
        .example-section {
            display: flex;
            align-content: center;
            align-items: center;
            height: 60px;
        }

        .example-margin {
            margin: 0 10px;
        }
    `]
})
export class NgMatFormsComponent implements OnInit {

    @Input() Fields: Array<Fields> = [];
    @Input() Column: any;
    FormGen: FormGroup;
    @Output() getFormValue: EventEmitter<any> = new EventEmitter();
    @Output() onChange: EventEmitter<any> = new EventEmitter();
    @Output() formChange: EventEmitter<any> = new EventEmitter();
    breakpoint: any;
    submitArray:any;

    constructor() { }

    onResize(event) {
        this.breakpoint = (event.target.innerWidth <= 400) ? 1 :
            ((event.target.innerWidth <= 700) ? 2 : this.Column);
    }

    ngOnInit() {
        this.FormGen = this.createForm();
        this.FormGen.valueChanges.subscribe(value => {
            this.formChange.emit(value);
        });
        this.breakpoint = (window.innerWidth <= 400) ? 1 :
            ((window.innerWidth <= 700) ? 2 : this.Column);
        this.submitArray = Array(3).fill(4);
        console.log(this.submitArray);
        
    }

    createForm(): FormGroup {
        const job = new FormGroup({});
        this.Fields.map(x => {
            let validators: any = x.validators;
            /* if (x.type === FieldType.CheckBox) {
                x.list.map((form) => {
                    const control: FormControl = new FormControl(x.defaultValue, validators);
                    job.addControl(x.formControlName, control);        
                });
            } */
            const control: FormControl = new FormControl(x.defaultValue, validators);
            job.addControl(x.formControlName, control);
        });
        return job;
    }

    valueChange(formControlName: string, event: any) {
        this.onChange.emit({
            controlName: formControlName,
            value: this.FormGen.get(formControlName).value,
            event: event
        });
    }

    submit() {
        this.getFormValue.emit(this.FormGen.value);
    }

    setValue(formControlName: string, value: any) {
    }

    trackByFormControlName(index: number, field: any): string {
        return field.formControlName;
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




