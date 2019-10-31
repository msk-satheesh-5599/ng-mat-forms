import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgMatFormsService } from './ng-mat-forms.service';;

/**
 * @description
 * Defines the map of field types for creating a form
 *
 * @publicApi
 */
export type fieldType = 'input' | 'select' | 'radio' | 'multiSelect' | 'checkBox'
    | 'datePicker' | 'autoComplete';

/**
 * @description
 * Defines the map of directives to determine the behaviour of the field
 *
 * @publicApi
 */
export type directive = 'alpha' | 'alphanumeric' | 'numeric' | 'custom';


export interface Fields {
    /**
     * @description
     * It's an variable to determine the type of the field.It's an part of the FieldType.
     * These are the available types of the fields 'input' | 'select' | 'radio' | 'multiSelect' | 'checkBox' | 'datePicker' | 'autoComplete'
    **/
    readonly type: fieldType;
    /**
     * @description
     * It's an variable to show the field label 
     * This value is set to the placeholder of the field 
    **/
    readonly label: string;
    /**
     * @description
     * It's an placeholder of the field 
     * This value is set to the placeholder of the field  
    **/
    readonly placeholder: string;
    /**
     * @description
     * It's an formControlName of the field
     * With this value only we need set the value    
    **/
    readonly formControlName: string;
    /**
     * @description
     * This value used for the determine the acceptable values of the field
     * The acceptable values are 'alpha' | 'alphanumeric' | 'numeric' | 'custom'  
    **/
    readonly directive?: directive;
    /**
     * @description
     * This value used for the fields behaviour the regex
     * It is used only in the time of value of the directive is custom
    **/
    readonly regex?: RegExp;
    /**
     * @description
     * This value used is set as the default value for the formControl of the formGroup
     * Non-Mandatory to the Field Object    
    **/
    defaultValue?: string;
    /**
     * @description
     * This value is for validating the fields and it accepts the form validators
     * Non-Mandatory to the Field Object    
    **/
    readonly validators?: Validators;
    /**
     * @description
     * This value is used for the select lists and it's an array of objects 
     * @template
     * ### let list = [{name: '', value: '' },{name: '', value: '' }];
     * Non-Mandatory to the Field Object    
    **/
    readonly list?: SelectList[];
    /**
     * @description
     * This value is used for hiding the label and show the label and it accepts the boolean
     * Non-Mandatory to the Field Object    
    **/
    readonly labelShow?: boolean;
    /**
     * @description
     * Used for disable the datepicker since the date
     * Non-Mandatory to the Field Object    
    **/
    readonly minDate?: Date;
    /**
     * @description
     * Used for disable the datepicker untill the date
     * Non-Mandatory to the Field Object    
    **/
    readonly maxDate?: Date;
}

export interface SelectList {
    name: string;
    value: string;
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

    constructor(private service: NgMatFormsService) { }

    onResize(event) {
        this.breakpoint = (event.target.innerWidth <= 400) ? 1 :
            ((event.target.innerWidth <= 700) ? 2 : this.Column);
    }

    ngOnInit() {
        this.service.FormGen = this.createForm();
        this.service.FormGen.valueChanges.subscribe(value => {
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
            value: this.service.FormGen.get(formControlName).value,
            event: event
        });
    }

    submit() {
        this.getFormValue.emit(this.service.FormGen.value);
    }

    trackByFormControlName(index: number, field: any): string {
        return field.formControlName;
    }

    getErrorMessage(control: FormControl, fieldName: string): string {
        for (let error in control.errors) {
            return {
                required: `${fieldName} is required`,
                minlength: `Minimun Length for ${fieldName} is 
                    ${control.errors[error].requiredLength}`
            }[error];
        }
        return;
    }

}




