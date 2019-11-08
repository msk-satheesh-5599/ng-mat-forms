import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { NgMatFormsService } from './ng-mat-forms.service';
import { fields } from './interfaces/fields.interface';
import { Options } from './interfaces/options.interface';
import { ErrorStateMatcher } from '@angular/material/core';


export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
    selector: 'ng-mat-forms',
    templateUrl: 'ng-mat-forms.component.html',
    styles: [`
        .mat-radio-button ~ .mat-radio-button {
            margin-left: 16px;
        }
        .example-section {
            display: flex;
            align-content: center;
            align-items: center;
            height: 40px;
        }
        .example-margin {
            margin: 0 10px;
        }
    `]
})
export class NgMatFormsComponent implements OnInit, AfterViewInit {

    @Input() readonly Fields: fields[];
    @Input() readonly options: Options;
    @Output() readonly getFormValue: EventEmitter<any> = new EventEmitter();
    @Output() readonly onChange: EventEmitter<any> = new EventEmitter();
    @Output() readonly formChange: EventEmitter<any> = new EventEmitter();
    breakpoint: Number;
    submitArray: Array<Number>;
    formSubmit: boolean;
    matcher = new ErrorStateMatcher();

    constructor(private formService: NgMatFormsService) { }

    onResize(event): void {
        this.breakpoint = (event.target.innerWidth <= 400) ? 1 :
            ((event.target.innerWidth <= 700) ? 2 : this.options.column);
        this.submitArray = Array(Number(this.breakpoint)).fill(0);
    }

    ngOnInit() {
        this.formService.FormGen = this.createForm();
        this.formService.Fields = this.Fields;
        this.formSubmit = ('errorMsgOnSubmit' in this.options) ? ((this.options.errorMsgOnSubmit) ? false : true) : true;
        this.formService.FormGen.valueChanges.subscribe(value => {
            this.formService.FormGen.markAsUntouched();
            this.formService.FormGen.setErrors(null);
            this.formChange.emit(value);
        });
        this.breakpoint = (window.innerWidth <= 400) ? 1 : ((window.innerWidth <= 700) ? 2 : this.options.column);
        this.submitArray = Array(Number(this.options.column)).fill(0);
    }

    ngAfterViewInit() {

    }

    createForm(): FormGroup {
        const job = new FormGroup({}, { updateOn: 'submit' });
        this.Fields.map(x => {
            let validators: any = x.validators;
            /* if (x.type === FieldType.CheckBox) {
                x.list.map((form) => {
                    const control: FormControl = new FormControl(x.defaultValue, validators);
                    job.addControl(x.formControlName, control);        
                });
            } */

            job.addControl(x.formControlName, new FormControl(x.defaultValue, validators));
        });
        return job;
    }

    valueChange(formControlName: string, event: any): void {
        console.log({
            controlName: formControlName,
            value: this.formService.FormGen.get(formControlName).value,
            event: event
        });
        this.onChange.emit({
            controlName: formControlName,
            value: this.formService.FormGen.get(formControlName).value,
            event: event
        });
    }

    submit(): void {
        (this.formSubmit) ? '' : this.formSubmit = true;
        this.validateAllFormFields(this.formService.FormGen);
        this.getFormValue.emit({ formValue: this.formService.FormGen.getRawValue(), formStatus: this.formService.FormGen.valid });
    }

    trackByFormControlName(index: number, field: any): string {
        return field.formControlName;
    }

    getErrorMessage(control: FormControl, fieldName: string): string {
        for (let error in control.errors) {
            return {
                required: `${fieldName} is required`,
                minlength: `Minimun Length for ${fieldName} is 
                    ${control.errors[error].requiredLength}`,
                maxlength: `Maximum Length for ${fieldName} is 
                    ${control.errors[error].requiredLength}`,
                email: `Enter valid email for ${fieldName}`
            }[error];
        }
        return;
    }

    validateAllFormFields(form: FormGroup): void {
        Object.keys(form.controls).map((x) => {
            let control = form.get(x);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }

}




