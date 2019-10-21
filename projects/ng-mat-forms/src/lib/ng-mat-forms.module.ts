import { NgModule } from '@angular/core';
import { NgMatFormsComponent } from './ng-mat-forms.component';
import {
    NgMatFormsService,
    NumberOnlyDirective,
    AlphabetOnlyDirective,
    AlphaNumericOnlyDirective,
    customDirective
} from './ng-mat-forms.service';
import { ReactiveFormsModule } from '@angular/forms';
import {
    MatInputModule,
    MatFormFieldModule,
    MatGridListModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule
} from '@angular/material';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        NgMatFormsComponent,
        NumberOnlyDirective,
        AlphabetOnlyDirective,
        AlphaNumericOnlyDirective,
        customDirective
    ],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatGridListModule,
        MatButtonModule,
        MatSelectModule,
        MatRadioModule,
        ReactiveFormsModule
    ],
    providers: [NgMatFormsService],
    bootstrap: [NgMatFormsComponent],
    exports: [NgMatFormsComponent]
})
export class NgMatFormsModule { }
