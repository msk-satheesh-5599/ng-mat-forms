import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMatFormsModule } from './../../projects/ng-mat-forms/src/lib/ng-mat-forms.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgMatFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
