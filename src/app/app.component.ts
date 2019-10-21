import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { NgMatFormsComponent, type, Fields, directive } from './../../projects/ng-mat-forms/src/lib/ng-mat-forms.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    @ViewChild('temp', { read: false, static: false }) NgMatForm: NgMatFormsComponent;


    constructor() { }

    Fields: Fields = [{
        type: type.Input,
        label: 'User Name',
        placeholder: 'Enter a User Name',
        formControlName: 'name',
        directive: directive.AlphaNumeric
    }, {
        type: type.Input,
        label: 'Password',
        placeholder: 'Enter a Password',
        formControlName: 'password',
        list: [
            {
                name: 'Satheesh',
                value: 'Satheesh'
            },
            {
                name: 'Bhuvi',
                value: 'I Love You'
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


