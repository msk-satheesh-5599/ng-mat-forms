import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { NgMatFormsService } from './../../projects/ng-mat-forms/src/lib/ng-mat-forms.service';
import { Validators } from '@angular/forms';
import { NgMatFormFields } from './../../projects/ng-mat-forms/src/lib/interfaces/fields.interface';
import { NgMatFormFieldChangeModal } from './../../projects/ng-mat-forms/src/lib/interfaces/formFieldChangeModal.interface';
import { NgMatFormSubmitModal } from './../../projects/ng-mat-forms/src/lib/interfaces/formSubmitModel.interface';
import { NgMatFormOptions } from '../../projects/ng-mat-forms/src/lib/interfaces/ng-mat-form-options.interface';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

    Fields: NgMatFormFields[] = [{
        type: 'input',
        label: 'User Name',
        placeholder: 'Enter a User Name',
        formControlName: 'name',
        directive: 'alphabetOnly',
        maxLength: '10',
        disable: true,
        validators: [Validators.required, Validators.email]
    }, {
        type: 'select',
        label: 'Password',
        placeholder: 'Enter a Password',
        formControlName: 'password',
        list: [],
        getListFromApi: true,
        api: {
            header: new HttpHeaders().set('Access-Control-Allow-Origin', '*'),
            url: 'https://my-json-server.typicode.com/msk-satheesh-5599/Portfolio/db',
            method: 'get',
            params: {}
        },
        validators: [Validators.required]
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
        formControlName: 'checkbox',
        list: [
            {
                name: 'Infinity War',
                value: 'Avengers'
            }
        ],
        changeEvents: [{
            value: true,
            disable: ['name'],
            setValue: [{ formControlName: 'name', value: 'Satheesh' }],
            removeValidators: ['name']
        }]
    }, {
        type: 'datePicker',
        label: 'Date of Birth',
        placeholder: 'Choose a date of birth',
        formControlName: 'dob',
        validators: [Validators.required],
        minDate: new Date('2019-01-01')
    }];

    option: NgMatFormOptions = {
        column: 3,
        errorMsgOnSubmit: true,
        floatLabel: 'never'
    };

    constructor(private service: NgMatFormsService) { }

    ngAfterViewInit() {
        setTimeout(() => {
            this.service.setControlValue('name', 'msk');
            /* this.service.setControlDisable('name'); */
        }, 1000);
    }



    getForm(form: NgMatFormSubmitModal) {
        console.log(form.formValue);
    }

    valueChanges(form: NgMatFormFieldChangeModal) {
        console.log(form);
    }

    getFormAll(form: Observable<any>) {
        form.subscribe((value) => {
            console.log(value);
        });
    }

}


