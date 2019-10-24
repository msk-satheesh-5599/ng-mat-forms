import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface Fields {
    /**
     * @description
     * It's an variable to determine the type of the field.It's an part of the FieldType.  
     * It's only on the FieldType Object.
     * These are the available types of the fields [Input, Select, MultiSelect, Radio, DatePicker]
     */
    readonly type: FieldType;
    /**
     * @description
     * It's an variable to show the field label..  
     * This value is set to the placeholder of the field. 
     */
    readonly label: string;
    /**
     * @description
     * It's an placeholder of the field. 
     * This value is set to the placeholder of the field.  
     */
    readonly placeholder: string;
    readonly formControlName: string;
    readonly directive?: Directive;
    readonly regex?: RegExp;
    defaultValue?: string;
    readonly validators?: Array<Validators>;
    readonly list?: Array<SelectList>;
    readonly labelShow?: boolean;
    readonly minDate?: Date;
    readonly maxDate?: Date;
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
    CheckBox = 'checkBox',
    DatePicker = 'datePicker',
    AutoComplete = 'autoComplete'
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
            height: 40px;
        }

        .example-margin {
            margin: 0 10px;
        }
    `]
})
export class NgMatFormsComponent implements OnInit {

    @Input() readonly Fields: Array<Fields> = [];
    @Input() readonly Column: any;
    FormGen: FormGroup;
    @Output() readonly getFormValue: EventEmitter<any> = new EventEmitter();
    @Output() readonly onChange: EventEmitter<any> = new EventEmitter();
    @Output() readonly formChange: EventEmitter<any> = new EventEmitter();
    breakpoint: any;
    submitArray: any;

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
        this.submitArray = Array(3).fill(0);
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
        this.FormGen.patchValue({ [formControlName]: value });
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




