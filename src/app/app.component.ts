import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { FieldType, Fields, Directive, NgMatFormsComponent } from './../../projects/ng-mat-forms/src/lib/ng-mat-forms.component';
import { Validators } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    @ViewChild('temp', { read: false, static: false }) NgMatForm: NgMatFormsComponent;

    constructor() { }

    Fields: Fields[] = [{
        type: FieldType.Input,
        label: 'User Name',
        placeholder: 'Enter a User Name',
        formControlName: 'name',
        directive: Directive.Numeric,
        validators: [Validators.required, Validators.minLength(5)]
    }, {
        type: FieldType.MultiSelect,
        label: 'Password',
        placeholder: 'Enter a Password',
        formControlName: 'password',
        list: [
            {
                name: 'Satheesh',
                value: 'I Love You Pondati'
            },
            {
                name: 'Bhuvi',
                value: 'I Love You Mama'
            }
        ]
    }, {
        type: FieldType.Radio,
        label: 'Confirm Password',
        placeholder: 'Enter a Password',
        formControlName: 'cpassword',
        list: [
            {
                name: 'Satheesh',
                value: 'gdfgfdg'
            },
            {
                name: 'Bhuvi',
                value: 'I Love You'
            }
        ]
    }, {
        type: FieldType.CheckBox,
        label: 'Confirm Password',
        placeholder: 'Enter a Password',
        formControlName: 'cpassword',
        list: [
            {
                name: 'Satheesh',
                value: 'gdfgfdg'
            },
            {
                name: 'Bhuvi',
                value: 'I Love You'
            }
        ]
    }];

    closeTag() {
        return "sdfdsfsdfsdfdsfdsf";
    }

    getForm(form) {
        console.log(form);
    }

    valueChanges(form) {
        console.log(form);
    }

}


