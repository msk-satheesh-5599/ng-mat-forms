import { Injectable, Directive, Input, ElementRef, HostListener, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class NgMatFormsService {
    FormGen: FormGroup;
    constructor() { }

    readonly setValue: any = (formControlName: string, value: any) => {
        this.FormGen.patchValue({ [formControlName]: value });
    }
}

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
export type directive = 'alpha' | 'alphanumeric' | 'numeric' | 'custom' | '';


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
    defaultValue?: string | number;
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

@Directive({
    selector: 'input[numbersOnly]'
})
export class NumberOnlyDirective {
    @Input() numbersOnly: boolean = false;
    constructor(private _el: ElementRef) { }
    @HostListener('input', ['$event'])
    @HostListener('copy', ['$event'])
    @HostListener('keydown', ['$event'])
    onInput(event) {
        if (this.numbersOnly) {
            const initalValue = this._el.nativeElement.value.replace(/[a-zA-Z]*/g, '');
            this._el.nativeElement.value = initalValue.replace(/[^\w\s]/gi, '');
            if (initalValue !== this._el.nativeElement.value) {
                event.stopPropagation();
            }
        }
    }
}

@Directive({
    selector: 'input[alphabetOnly]'
})
export class AlphabetOnlyDirective {
    @Input() alphabetOnly: boolean = false;
    constructor(private _el: ElementRef) { }
    @HostListener('input', ['$event'])
    @HostListener('copy', ['$event'])
    onInput(event) {
        if (this.alphabetOnly) {
            const initalValue = this._el.nativeElement.value.replace(/[0-9]*/g, '');
            this._el.nativeElement.value = initalValue.replace(/[^\w\s]/gi, '');
            if (initalValue !== this._el.nativeElement.value) {
                event.stopPropagation();
            }
        }
    }
}

@Directive({
    selector: 'input[alphanumericOnly]'
})
export class AlphaNumericOnlyDirective {
    @Input() alphanumericOnly: boolean = false;
    constructor(private _el: ElementRef) { }
    @HostListener('input', ['$event'])
    @HostListener('copy', ['$event'])
    onInput(event) {
        if (this.alphanumericOnly) {
            const initalValue = this._el.nativeElement.value;
            this._el.nativeElement.value = initalValue.replace(/[^\w\s]/gi, '');
            if (initalValue !== this._el.nativeElement.value) {
                event.stopPropagation();
            }
        }
    }
}

@Directive({
    selector: 'input[customRegex]'
})
export class customDirective {
    @Input() customRegex: boolean = false;
    @Input() regExp: any;
    constructor(private _el: ElementRef) { }
    @HostListener('input', ['$event'])
    @HostListener('copy', ['$event'])
    onInput(event) {
        if (this.customRegex) {
            const initalValue = this._el.nativeElement.value;
            this._el.nativeElement.value = initalValue.replace(this.regExp, '');
            if (initalValue !== this._el.nativeElement.value) {
                event.stopPropagation();
            }
        }
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

