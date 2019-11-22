# ng-mat-forms

## Description

  Highly configurable Angular Dynamic Form Generator With Material. Compatible Angular2+.
  
## Installation

  To install this component to an external project, follow the procedure:
  
    1. ### npm install ng-mat-forms --save
    2. Add NgMatFormsModule import to your @NgModule like example below
    
    ```typescript
    import { NgModule } from '@angular/core';
    import { BrowserModule } from '@angular/platform-browser';
    import { MyTestApp } from './my-test-app';
    import { NgMatFormsModule } from 'ng-mat-forms';

    @NgModule({
        imports:      [ BrowserModule, NgMatFormsModule ],
        declarations: [ MyTestApp ],
        bootstrap:    [ MyTestApp ]
    })
    export class MyTestAppModule {}
    ```

