import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgMatFormsService } from './ng-mat-forms.service';
import { fields } from './interfaces/fields.interface';

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
export class NgMatFormsComponent implements OnInit {

    @Input() readonly Fields: fields[];
    @Input() readonly Column: any;
    FormGen: FormGroup;
    @Output() readonly getFormValue: EventEmitter<any> = new EventEmitter();
    @Output() readonly onChange: EventEmitter<any> = new EventEmitter();
    @Output() readonly formChange: EventEmitter<any> = new EventEmitter();
    breakpoint: any;
    submitArray: any;

    constructor(private formService: NgMatFormsService) { }

    onResize(event): void {
        this.breakpoint = (event.target.innerWidth <= 400) ? 1 :
            ((event.target.innerWidth <= 700) ? 2 : this.Column);
    }

    ngOnInit() {
        this.formService.FormGen = this.createForm();
        this.formService.Fields = this.Fields;
        this.formService.FormGen.valueChanges.subscribe(value => {
            this.formChange.emit(value);
        });
        this.breakpoint = (window.innerWidth <= 400) ? 1 :
            ((window.innerWidth <= 700) ? 2 : this.Column);
        this.submitArray = Array(3).fill(0);
    }

    createForm(): FormGroup {
        const job = new FormGroup({});
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
        this.onChange.emit({
            controlName: formControlName,
            value: this.formService.FormGen.get(formControlName).value,
            event: event
        });
    }

    submit(): void {
        this.getFormValue.emit(this.formService.FormGen.value);
    }

    trackByFormControlName(index: number, field: any): string {
        return field.formControlName;
    }

    getErrorMessage(control: FormControl, fieldName: string): string {
        for (let error in control.errors) {
            return {
                required: `${fieldName} is required`,
                minlength: `Minimun Length for ${fieldName} is 
                    ${control.errors[error].requiredLength}`
            }[error];
        }
        return;
    }

}




