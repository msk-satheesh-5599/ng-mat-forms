import { Validators } from '@angular/forms';
import { SelectList, NgMatFormFieldChanges, NgMatSelectListFromUrl } from './index';

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
export type directive = 'alphabetOnly' | 'alphanumericOnly' | 'numericOnly' | 'custom';

export interface NgMatFormFields {
    /**
     * @description
     * It's an variable to determine the type of the field.It's an part of the FieldType.
     * These are the available types of the fields 'input' | 'select' | 'radio' | 'multiSelect' | 'checkBox' | 'datePicker' | 'autoComplete'
     */
    readonly type: fieldType;
    /**
     * @description
     * It's an variable to show the field label
     * This value is set to the placeholder of the field
     */
    readonly label: string;
    /**
     * @description
     * It's an placeholder of the field
     * This value is set to the placeholder of the field
     */
    readonly placeholder: string;
    /**
     * @description
     * It's an formControlName of the field
     * With this value only we need set the value
     */
    readonly formControlName: string;
    /**
     * @description
     * This value used for the determine the acceptable values of the field
     * The acceptable values are 'alpha' | 'alphanumeric' | 'numeric' | 'custom'
     */
    readonly directive?: directive;
    /**
     * @description
     * This value used for the fields behaviour the regex
     * It is used only in the time of value of the directive is custom
     */
    readonly regex?: RegExp;
    /**
     * @description
     * This value used is set as the default value for the formControl of the formGroup
     * Non-Mandatory to the Field Object
     */
    defaultValue?: string | number;
    /**
     * @description
     * This value is for validating the fields and it accepts the form validators
     * Non-Mandatory to the Field Object
     */
    readonly validators?: Validators;
    /**
     * @description
     * This value is used for the select lists and it's an array of objects
     * @template
     * ### let list = [{name: '', value: '' },{name: '', value: '' }];
     * Non-Mandatory to the Field Object
     */
    list?: SelectList[];
    /**
     * @description
     * This value is used for hiding the label and show the label and it accepts the boolean
     * Non-Mandatory to the Field Object
     */
    readonly labelShow?: boolean;
    /**
     * @description
     * Used for disable the datepicker since the date
     * Non-Mandatory to the Field Object
     */
    readonly minDate?: Date;
    /**
     * @description
     * Used for disable the datepicker untill the date
     * Non-Mandatory to the Field Object
     */
    readonly maxDate?: Date;
    /**
     * @description
     * Used for disable the field in the forms
     * Non-Mandatory to the Field Object
     */
    readonly disable?: boolean;
    /**
     * @description
     * To Manage the change events
     * Non-Mandatory to the Field Object
     */
    readonly changeEvents?: Array<NgMatFormFieldChanges>;
    /**
     * @description
     * To Manage the blur events
     * Non-Mandatory to the Field Object
     */
    readonly blurEvents?: Array<NgMatFormFieldChanges>;
    /**
     * @description
     * max length the form field
     * Non-Mandatory to the Field Object
     */
    readonly maxLength?: string;
    /**
     * @description
     * min length the form field
     * Non-Mandatory to the Field Object
     */
    readonly minLength?: string;
    /**
     * @description
     * To determine get the select options frol url or not
     * Non-Mandatory to the Field Object
     */
    readonly getListFromApi?: boolean;
    /**
     * @description
     * This object used to call the service and load the data to the select
     * Non-Mandatory to the Field Object
     */
    readonly api?: NgMatSelectListFromUrl;
    /**
     * @description
     * This load depenent select with this field change
     * Non-Mandatory to the Field Object
     */
    loadDepenentSelectOnChange?: {
        formControlName: string;
        api: NgMatSelectListFromUrl;
    };
    /**
     * @description
     * Contains the error messages of the field.
     * Non-Mandatory to the Field Object
     */
    errorMessage?: {
        [key: string]: string;
    };
}



