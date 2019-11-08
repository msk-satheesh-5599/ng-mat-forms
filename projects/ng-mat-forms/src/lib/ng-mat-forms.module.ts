import { NgModule } from '@angular/core';
import { NgMatFormsComponent } from './ng-mat-forms.component';
import { NgMatFormsService } from './ng-mat-forms.service';
import { AlphabetOnlyDirective } from './directives/alphabetOnly.directive';
import { AlphaNumericOnlyDirective } from './directives/alphanumericOnly.directive';
import { customDirective } from './directives/custom.directive';
import { NumberOnlyDirective } from './directives/numericOnly.directive';
import { DisableFieldDirective } from './directives/disable-field.directive';
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

@NgModule({
    declarations: [
        NgMatFormsComponent,
        NumberOnlyDirective,
        AlphabetOnlyDirective,
        AlphaNumericOnlyDirective,
        customDirective,
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
        ReactiveFormsModule
    ],
    providers: [NgMatFormsService],
    bootstrap: [NgMatFormsComponent],
    exports: [NgMatFormsComponent]
})
export class NgMatFormsModule { }
