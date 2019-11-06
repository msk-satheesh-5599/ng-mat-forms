import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { NgMatFormsService } from './../../projects/ng-mat-forms/src/lib/ng-mat-forms.service';
import { Validators } from '@angular/forms';
import { fields } from './../../projects/ng-mat-forms/src/lib/interfaces/fields.interface';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

    Fields: fields[] = [{
        type: 'input',
        label: 'User Name',
        placeholder: 'Enter a User Name',
        formControlName: 'name',
        directive: 'alphabetOnly',
        validators: [Validators.required, Validators.minLength(5)],
        disable: true
    }, {
        type: 'select',
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
        ],
        validators: [Validators.required]
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
        validators: [Validators.required],
        minDate: new Date('2019-01-01')
    }];

    constructor(private service: NgMatFormsService) { }

    ngAfterViewInit() {
        setTimeout(() => {
            this.service.setValue('name', 'Satheesh');
        }, 1000);
    }



    getForm(form) {
        console.log(form);
    }

    valueChanges(form) {
        console.log(form);
    }

}


