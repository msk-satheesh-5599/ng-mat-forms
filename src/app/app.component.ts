import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { FieldType, Fields, Directive, NgMatFormsComponent } from './../../projects/ng-mat-forms/src/lib/ng-mat-forms.component';
import { Validators } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

    @ViewChild('temp', { read: false, static: false }) NgMatForm: NgMatFormsComponent;
    Fields: Fields[] = [{
        type: 'input',
        label: 'User Name',
        placeholder: 'Enter a User Name',
        formControlName: 'name',
        directive: Directive.AlphaNumeric,
        validators: [Validators.required, Validators.minLength(5)]
    }, {
        type: 'multiSelect',
        label: 'Password',
        placeholder: 'Enter a Password',
        formControlName: 'password',
        list: [
            {
                name: 'Infinity War',
                value: 'Avengers'
            },
            {
                name: 'End Game',
                value: 'Avengers'
            }
        ]
    }, {
        type: 'radio',
        label: 'Confirm Password',
        placeholder: 'Enter a Password',
        formControlName: 'cpassword',
        list: [
            {
                name: 'Infinity War',
                value: 'Avengers'
            },
            {
                name: 'End Game',
                value: 'Avengers End Game'
            }
        ]
    }, {
        type: 'checkBox',
        label: 'Confirm Password',
        placeholder: 'Enter a Password',
        formControlName: 'cpassword',
        list: [
            {
                name: 'Infinity War',
                value: 'Avengers'
            },
            {
                name: 'End Game',
                value: 'Avengers'
            }
        ]
    }, {
        type: 'datePicker',
        label: 'Date of Birth',
        placeholder: 'Choose a date of birth',
        formControlName: 'dob',
        validators: [Validators.required]
    }];

    constructor() { }

    ngAfterViewInit() {
        setTimeout(() => {
            this.NgMatForm.setValue('name', 'Satheesh');
        }, 1000);
    }



    getForm(form) {
        console.log(form);
    }

    valueChanges(form) {
        console.log(form);
    }

}


