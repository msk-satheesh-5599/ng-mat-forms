import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { type, Fields, directive } from 'ng-mat-forms';
import { Validators } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    @ViewChild('temp', { read: false, static: false }) NgMatForm: NgMatFormsComponent;

    constructor() {

    }

    Fields: Array<Fields> = [{
        type: type.Input,
        label: 'User Name',
        placeholder: 'Enter a User Name',
        formControlName: 'name',
        directive: directive.AlphaNumeric,
        validators: [Validators.required, Validators.minLength(5)]
    }, {
        type: type.Input,
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
        type: type.Radio,
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


