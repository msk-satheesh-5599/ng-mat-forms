import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { HttpClientModule } from '@angular/common/http';
import { NgMatFormsComponent } from './ng-mat-forms.component';
import { CustomDirective } from './directives/custom.directive';
import { AlphabetOnlyDirective } from './directives/alphabetOnly.directive';
import { AlphaNumericOnlyDirective } from './directives/alphanumericOnly.directive';
import { DisableFieldDirective } from './directives/disable-field.directive';
import { NumberOnlyDirective } from './directives/numericOnly.directive';

describe('NgMatFormsComponent', () => {
    let component: NgMatFormsComponent;
    let fixture: ComponentFixture<NgMatFormsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
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
                HttpClientModule,
                BrowserAnimationsModule
            ],
            declarations: [
                NgMatFormsComponent,
                AlphaNumericOnlyDirective,
                AlphabetOnlyDirective,
                DisableFieldDirective,
                NumberOnlyDirective,
                CustomDirective
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NgMatFormsComponent);
        component = fixture.componentInstance;
        component.Fields = [{
            type: 'input',
            formControlName: 'name',
            label: 'name',
            placeholder: 'name'
        }];
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
