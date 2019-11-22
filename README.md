# ng-mat-forms

## Description

    Highly configurable Angular Dynamic Form Generator With Angular Material. Compatible Angular2+.
  
## Installation

To install this component to an external project, follow the procedure:
  
1.  __npm install ng-mat-forms --save__
2. Add __NgMatFormsModule__ import to your __@NgModule__ like example below

```javascript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyTestApp } from './my-test-app';
import { NgMatFormsModule } from 'ng-mat-forms';

@NgModule({
    imports:      [ BrowserModule, BrowserAnimationsModule, NgMatFormsModule ],
    declarations: [ MyTestApp ],
    bootstrap:    [ MyTestApp ]
})
export class MyTestAppModule {}
```
3. If you are using __systemjs__ package loader add the following ng-mat-forms properties to the __System.config__:

```javascript
(function (global) {
    System.config({
        paths: {
            'npm:': 'node_modules/'
        },
        map: {
            // Other components are here...

            'ng-mat-forms': 'npm:ng-mat-forms/bundles/ng-mat-forms.umd.min.js'
        },
        packages: {
        }
    });
})(this);   
```

## Usage

To use __ng-mat-forms__ define the application class as follows:

```javascript
import {NgMatFormOptions,fields} from 'ng-mat-forms';
// other imports here...

export class MyTestApp {

    public ngMatFormsOptions: NgMatFormOptions = {
        column: 3
        // other options...
    };

    // Initialized a field list array which extended a field interface.
    public ngMatFormFields: fields[] = [{
        type: 'input',
        label: 'User Name',
        placeholder: 'Enter a User Name',
        formControlName: 'name'
        // other options...
    }, {
        type: 'select',
        label: 'Password',
        placeholder: 'Enter a Password',
        formControlName: 'password',
        list: [
            {
                name: 'Infinity War',
                value: 'Avengers',
                type: 'option'
            },
            {
                name: 'End Game',
                value: 'Avengers',
                type: 'option'
            }
        ]
        // other options...
    }];

    constructor() { }
}  
```
Add the following snippet inside your template:

```html
<ng-mat-forms [Fields]='ngMatFormFields' [options]='ngMatFormsOptions'></ng-mat-forms>
```

## Attributes

__options attribute__

Value of the options attribute is a type of __NgMatFormOptions__. It can contain the following properties.

| option | Default | Type | Description |
| ------ |:-------:|-----:|:------------|
| column |    3    |  number | To intialize the column count of the fields with in the row. |
|errorMsgOnSubmit| false | boolean | To determine weather error messages of the fields need to show on field change or only on form submit|
|floatLabel| 
  


