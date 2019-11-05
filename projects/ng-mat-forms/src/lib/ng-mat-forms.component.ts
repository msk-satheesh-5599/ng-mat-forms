import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgMatFormsService, Fields } from './ng-mat-forms.service';

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

    @Input() readonly Fields: Fields[];
    @Input() readonly Column: any;
    FormGen: FormGroup;
    @Output() readonly getFormValue: EventEmitter<any> = new EventEmitter();
    @Output() readonly onChange: EventEmitter<any> = new EventEmitter();
    @Output() readonly formChange: EventEmitter<any> = new EventEmitter();
    breakpoint: any;
    submitArray: any;

    constructor(private service: NgMatFormsService) { }

    onResize(event): void {
        this.breakpoint = (event.target.innerWidth <= 400) ? 1 :
            ((event.target.innerWidth <= 700) ? 2 : this.Column);
    }

    ngOnInit() {
        this.service.FormGen = this.createForm();
        this.service.FormGen.valueChanges.subscribe(value => {
            this.replaceValue(value);
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
            const control: FormControl = new FormControl(x.defaultValue, validators);
            job.addControl(x.formControlName, control);
        });
        return job;
    }

    valueChange(formControlName: string, event: any): void {
        this.onChange.emit({
            controlName: formControlName,
            value: this.service.FormGen.get(formControlName).value,
            event: event
        });
    }

    submit(): void {
        this.getFormValue.emit(this.service.FormGen.value);
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

    replaceValue(value): void {
        Object.keys(value).map(key => {
            let field: any = this.Fields.find(x => x.formControlName == key);
            if (field.hasOwnProperty('directive')) {
                switch (field.directive) {
                    case "numeric":
                        this.service.FormGen.get(key).setValue(value[key].replace(/[a-zA-Z]*/g, ''));
                        break;
                    case "alpha":
                        this.service.FormGen.get(key).setValue(value[key].replace(/[0-9]*/g, '').replace(/[^\w\s]/gi, ''));
                        break;
                    case "alphanumeric":
                        this.service.FormGen.get(key).setValue(value[key].replace(/[^\w\s]/gi, ''));
                        break;
                    case "custom":
                        this.service.FormGen.get(key).setValue(value[key].replace(/[a-zA-Z]*/g, ''));
                        break;
                    default:
                        break
                }
            }
        });
    }

}




