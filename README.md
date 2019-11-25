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
import {NgMatFormOptions,NgMatFormFields} from 'ng-mat-forms';
// other imports here...

export class MyTestApp {

    public ngMatFormsOptions: NgMatFormOptions = {
        column: 3
        // other options...
    };

    // Initialized a field list array which extended a field interface.
    public ngMatFormFields: NgMatFormFields[] = [{
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

Note: `*mandatory`

| option | Default | Type | Description |
| ------ |:-------:|:-----:|:------------|
| column* |    3    |  number | To intialize the column count of the fields with in the row. |
|errorMsgOnSubmit| false | boolean | To determine weather error messages of the fields need to show on field change or only on form submit|
|floatLabel| auto | FloatLabelType | float label configuration |
|color | primary | ThemePalette | color of the form field|
| appearance | legacy | MatFormFieldAppearance | appearance of the form field|

__field attribute__

Value of the options attribute is a type of __NgMatFormField__. It can contain the following properties.

Note: `*mandatory`

| option | Default | Type | Description |
| ------ |:-------:|:-----:|:------------|
|type*| no default value | fieldType | type of the form field. it's a type of fieldType. types available `'input' , 'select' , 'radio' , 'multiSelect', 'checkBox', 'datePicker', 'autoComplete'` | 
| label* | no default value | string | label of the form field|
|placeholder* | no default value | string | placeholder of the form field |
|formControlName* | no default value | string | formcontrolname for the form field |
|directive | no default value | directive | to determine the behaviour of the field . directives available are `'alphabetOnly' , 'alphanumericOnly' , 'numericOnly' , 'custom'`|
| regex | no default value | RegExp | if the directive is custom this regex is the behaviour of the form field|
|defaultValue| no default value | string or number | to set initial value for the form field |
| validators | no default value | Validators | validators for the form field. it extends angular build in validators|
|list | no default value | selectlist[] | if the field type is `select` then this list is the options of the field.|
|labelShow| true | boolean | display the label or not | 
|minDate| no default value | Date | for disable the datepicker since the date|
| maxDate | no default value | Date | for disable the datepicker untill the date|
|disable| false | boolean | for disable the field | 

### formChange callback

* called when any of the form field changes
  * event parameter:
    * event: observable
  * event parameter type is __observable__
  * it is formGroup __valueChanges__ event it gives the value changed value of the form.

 #### Example of the formChange callback:
  
  ```js
  onformChanged(event: Observable<any>) {
      let formChange:Observable<any> = event;
      formChange.subscribe((value) => {
          //Other operations here...
          console.log(value);
      });
  }
  ```
  template snippet: 
  ```html
  <ng-mat-forms [Fields]='ngMatFormFields' [options]='ngMatFormsOptions' 
                (formChange)="onformChanged($event)"></ng-mat-forms>
  ```
  
### formSubmit callback

* called when the form submits
  * event parameter:
    * event.formValue: value of the form
    * event.formStatus: status of the value 
  * event parameter type is __NgMatFormSubmitModal__

#### Example of the submitForm formSubmit:
  
```js
onformSubmit(event: NgMatFormSubmitModal) {
  //Other operations here...
  console.log({formValue: event.formValue,formStatus: event.formStatus});
}
```
template snippet: 
```html
<ng-mat-forms [Fields]='ngMatFormFields' [options]='ngMatFormsOptions' 
              (formSubmit)="onformSubmit($event)"></ng-mat-forms>
```
### formFieldsChange callback

* called when any of the form field changes
  * event parameter:
    * event.controlName: formControlName of the value changed field
    * event.value: value of the field
    * event.event: field change event
  * event parameter type is __NgMatFormFieldChangeModal__

#### Example of the formFieldsChange callback:
  
```js
onformFieldsChange(event: NgMatFormFieldChangeModal) {
  //Other operations here...
  console.log({controlName: event.controlName,value: event.value, event: event.event});
}
```
template snippet: 
```html
<ng-mat-forms [Fields]='ngMatFormFields' [options]='ngMatFormsOptions' 
              (formFieldsChange)="onformFieldsChange($event)"></ng-mat-forms>
```

## Apis

### setControlValue

__description__
* set an value for the any of the control in the formGroup
* parameters 
  * formControlName : string
  * value : string
    
__example__
```javascript
import { NgMatFormOptions, NgMatFormFields, NgMatFormService } from 'ng-mat-forms';
// other imports here...

export class MyTestApp {

    public ngMatFormsOptions: NgMatFormOptions = {
        column: 3
        // other options...
    };

    // Initialized a field list array which extended a field interface.
    public ngMatFormFields: NgMatFormFields[] = [{
        type: 'input',
        label: 'User Name',
        placeholder: 'Enter a User Name',
        formControlName: 'name'
        // other options...
    }];
    
    setValue(): void {
        //this.ngMatFormService.setControlValue(formControlName:string, name:string): void;
        this.ngMatFormService.setControlValue('name', 'msk');
    }

    constructor(private ngMatFormService:NgMatFormService) {}
}
```
### setFormValue

__description__
* set an value for the formGroup
* parameters   
  * form value object contains formControlName as key and value
    * example: { name: 'msk' }
    
__example__
```javascript
import { NgMatFormOptions, NgMatFormFields, NgMatFormService } from 'ng-mat-forms';
// other imports here...

export class MyTestApp {

    public ngMatFormsOptions: NgMatFormOptions = {
        column: 3
        // other options...
    };

    // Initialized a field list array which extended a field interface.
    public ngMatFormFields: NgMatFormFields[] = [{
        type: 'input',
        label: 'User Name',
        placeholder: 'Enter a User Name',
        formControlName: 'name'
        // other options...
    }];
    
    setValue(): void {
        //this.ngMatFormService.setFormValue({ [formControlName]: 'msk' });
        this.ngMatFormService.setFormValue({ name: 'msk' });
    }

    constructor(private ngMatFormService:NgMatFormService) {}
}
```

### setControlDisable

__description__
* disable the formcontrol
* parameters   
  * formControlName
    
__example__
```javascript
import { NgMatFormOptions, NgMatFormFields, NgMatFormService } from 'ng-mat-forms';
// other imports here...

export class MyTestApp {

    public ngMatFormsOptions: NgMatFormOptions = {
        column: 3
        // other options...
    };

    // Initialized a field list array which extended a field interface.
    public ngMatFormFields: NgMatFormFields[] = [{
        type: 'input',
        label: 'User Name',
        placeholder: 'Enter a User Name',
        formControlName: 'name'
        // other options...
    }];
    
    setDisable(): void {
        //this.ngMatFormService.setControlDisable(formControlName);
        this.ngMatFormService.setControlDisable('name');
    }

    constructor(private ngMatFormService:NgMatFormService) {}
}
```

### setControlEnable

__description__
* enable the formcontrol
* parameters   
  * formControlName
    
__example__
```javascript
import { NgMatFormOptions, NgMatFormFields, NgMatFormService } from 'ng-mat-forms';
// other imports here...

export class MyTestApp {

    public ngMatFormsOptions: NgMatFormOptions = {
        column: 3
        // other options...
    };

    // Initialized a field list array which extended a field interface.
    public ngMatFormFields: NgMatFormFields[] = [{
        type: 'input',
        label: 'User Name',
        placeholder: 'Enter a User Name',
        formControlName: 'name'
        // other options...
    }];
    
    setDisable(): void {
        //this.ngMatFormService.setControlEnable(formControlName);
        this.ngMatFormService.setControlEnable('name');
    }

    constructor(private ngMatFormService:NgMatFormService) {}
}
```

### setValidator

__description__
* make the field as required with angular validators
* parameters   
  * formControlName
  * validators
    
__example__
```javascript
import { NgMatFormOptions, NgMatFormFields, NgMatFormService } from 'ng-mat-forms';

// other imports here...

export class MyTestApp {

    public ngMatFormsOptions: NgMatFormOptions = {
        column: 3
        // other options...
    };

    // Initialized a field list array which extended a field interface.
    public ngMatFormFields: NgMatFormFields[] = [{
        type: 'input',
        label: 'User Name',
        placeholder: 'Enter a User Name',
        formControlName: 'name'
        // other options...
    }];
    
    setValidator(): void {
        //this.ngMatFormService.setValidator(formControlName, validators);
        this.ngMatFormService.setValidator('name', [Validators.required]);
    }

    constructor(private ngMatFormService:NgMatFormService) {}
}
```

### removeValidator

__description__
* make the field as non-required
* parameters   
  * formControlName
    
__example__
```javascript
import { NgMatFormOptions, NgMatFormFields, NgMatFormService } from 'ng-mat-forms';
// other imports here...

export class MyTestApp {

    public ngMatFormsOptions: NgMatFormOptions = {
        column: 3
        // other options...
    };

    // Initialized a field list array which extended a field interface.
    public ngMatFormFields: NgMatFormFields[] = [{
        type: 'input',
        label: 'User Name',
        placeholder: 'Enter a User Name',
        formControlName: 'name'
        // other options...
    }];
    
    removeValidator(): void {
        //this.ngMatFormService.removeValidator(formControlName);
        this.ngMatFormService.removeValidator('name');
    }

    constructor(private ngMatFormService:NgMatFormService) {}
}
```

## Author

* Author: msk

## Keywords

* ng-mat-forms
* form-generator
* Angular2+
* typescript
