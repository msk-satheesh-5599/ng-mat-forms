import { NgModule } from '@angular/core';
import { NgMatFormsComponent } from './ng-mat-forms.component';
import { NgMatFormsService } from './ng-mat-forms.service';
import { CustomDirective } from './directives/custom.directive';
import { AlphabetOnlyDirective } from './directives/alphabetOnly.directive';
import { AlphaNumericOnlyDirective } from './directives/alphanumericOnly.directive';
import { DisableFieldDirective } from './directives/disable-field.directive';
import { NumberOnlyDirective } from './directives/numericOnly.directive';
import { ReactiveFormsModule } from '@angular/forms';
import {
    MatInputModule,
    MatFormFieldModule,
    MatGridListModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatNativeDateModule
} from '@angular/material';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        NgMatFormsComponent,
        NumberOnlyDirective,
        AlphabetOnlyDirective,
        AlphaNumericOnlyDirective,
        CustomDirective,
        DisableFieldDirective
    ],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatGridListModule,
        MatButtonModule,
        MatSelectModule,
        MatRadioModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [NgMatFormsService],
    bootstrap: [NgMatFormsComponent],
    exports: [
        NgMatFormsComponent,
        NumberOnlyDirective,
        AlphabetOnlyDirective,
        AlphaNumericOnlyDirective,
        CustomDirective,
        DisableFieldDirective
    ]
})
export class NgMatFormsModule { }
