import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { NgMatFormsService } from './ng-mat-forms.service';
import {
    FieldValidatorModel,
    FieldValueModel,
    NgMatFormFieldChangeModal,
    NgMatFormFieldChanges,
    NgMatFormFields,
    NgMatFormOptions,
    NgMatFormSubmitModal,
    SelectList
} from './interfaces/index';
import { NgMatFormErrorStateMatcher } from './NgMatFormErrorStateMatcher.class';
import { Observable } from 'rxjs';

@Component({
    selector: 'ng-mat-forms',
    exportAs: 'ng-mat-forms',
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

    @Input() Fields: NgMatFormFields[] = [];
    @Input() options: NgMatFormOptions = {
        column: 3,
        appearance: 'legacy',
        color: 'primary',
        floatLabel: 'auto'
    };
    @Output() readonly formSubmit: EventEmitter<NgMatFormSubmitModal> = new EventEmitter();
    @Output() readonly formChange: EventEmitter<Observable<any>> = new EventEmitter();
    @Output() readonly formFieldsChange: EventEmitter<NgMatFormFieldChangeModal> = new EventEmitter();
    @Output() readonly formFieldsBlurChange: EventEmitter<NgMatFormFieldChangeModal> = new EventEmitter();
    breakpoint: number;
    submitArray: Array<number>;
    formSubmitFlag: boolean;
    matcher = new NgMatFormErrorStateMatcher();

    constructor(public formService: NgMatFormsService) { }

    onResize(event): void {
        this.breakpoint = (event.target.innerWidth <= 400) ? 1 :
            ((event.target.innerWidth <= 700) ? 2 : this.options.column);
        this.submitArray = Array(Number(this.breakpoint)).fill(0);
    }

    ngOnInit() {
        this.formService.FormGen = this.createForm();
        this.formService.Fields = this.Fields;
        this.getSelectListFromService();
        this.formSubmitFlag = ('errorMsgOnSubmit' in this.options) ? ((this.options.errorMsgOnSubmit) ? false : true) : true;
        this.matcher.setupdateOnSubmit('options', this.formSubmitFlag);
        this.formChange.emit(this.formService.FormGen.valueChanges);
        this.breakpoint = (window.innerWidth <= 400) ? 1 : ((window.innerWidth <= 700) ? 2 : this.options.column);
        this.submitArray = Array(Number(this.options.column)).fill(0);
    }

    createForm(): FormGroup {
        const job = new FormGroup({});
        this.Fields.forEach((x: NgMatFormFields) => {
            const initialValue = x.hasOwnProperty('defaultValue') ? x.defaultValue : '';
            if (x.hasOwnProperty('validators')) {
                job.addControl(x.formControlName, new FormControl(initialValue, x.validators));
            } else {
                job.addControl(x.formControlName, new FormControl(initialValue));
            }
        });
        return job;
    }

    valueChange(formControlName: string, eventChange): void {
        const emitObj: NgMatFormFieldChangeModal = {
            controlName: formControlName,
            value: this.formService.FormGen.get(formControlName).value,
            event: eventChange
        };
        this.onFieldChangeOperations(emitObj);
        this.loadDepenentSelectOnChange(emitObj);
        this.formFieldsChange.emit(emitObj);
    }

    blurChange(formControlName: string, eventBlur): void {
        const emitObj: NgMatFormFieldChangeModal = {
            controlName: formControlName,
            value: this.formService.FormGen.get(formControlName).value,
            event: eventBlur
        };
        this.onFieldChangeOperations(emitObj);
        this.formFieldsBlurChange.emit(emitObj);
    }

    submit(): void {
        this.matcher.setupdateOnSubmit('formSubmit', true);
        if (!this.formSubmitFlag) { this.formSubmitFlag = true; }
        this.validateAllFormFields(this.formService.FormGen);
        this.formSubmit.emit({ formValue: this.formService.FormGen.getRawValue(), formStatus: this.formService.FormGen.valid });
    }

    trackByFormControlName(index: number, field: any): string {
        return field.formControlName;
    }

    getErrorMessage(field: NgMatFormFields, control: AbstractControl, fieldName: string): string {
        if (field.hasOwnProperty('errorMessage')) {
            for (const error in control.errors) {
                if (control.errors.hasOwnProperty(error)) {
                    return field.errorMessage[error];
                }
            }
        } else {
            for (const error in control.errors) {
                if (control.errors.hasOwnProperty(error)) {
                    return {
                        required: `${fieldName} is required`,
                        minlength: `Minimun Length for ${fieldName} is ${control.errors[error].requiredLength}`,
                        maxlength: `Maximum Length for ${fieldName} is ${control.errors[error].requiredLength}`,
                        email: `Enter valid email for ${fieldName}`
                    }[error];
                }
            }
        }
        return;
    }

    validateAllFormFields(form: FormGroup): void {
        Object.keys(form.controls).forEach((x) => {
            const control = form.get(x);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }

    onFieldChangeOperations(event: NgMatFormFieldChangeModal) {
        const change = new Observable((observer) => {
            this.Fields.forEach((field) => {
                if (field.formControlName === event.controlName) {
                    if (field.hasOwnProperty('changeEvents') && field.changeEvents.length > 0) {
                        observer.next(field.changeEvents);
                    }
                }
            });
        });

        change.subscribe((changeOperations: NgMatFormFieldChanges[]) => {
            changeOperations.forEach((changeOperation) => {
                if (changeOperation.value === event.value) {
                    Object.keys(changeOperation).forEach((keys) => {
                        switch (keys) {
                            case 'disable':
                                changeOperation.disable.forEach((control: string) => {
                                    this.formService.setControlDisable(control);
                                });
                                break;
                            case 'enable':
                                changeOperation.enable.forEach((control: string) => {
                                    this.formService.setControlEnable(control);
                                });
                                break;
                            case 'setValidators':
                                changeOperation.setValidators.forEach((control: FieldValidatorModel) => {
                                    this.formService.setValidator(control.formControlName, control.validators);
                                });
                                break;
                            case 'removeValidators':
                                changeOperation.removeValidators.forEach((control: string) => {
                                    this.formService.removeValidator(control);
                                });
                                break;
                            case 'setValue':
                                changeOperation.setValue.forEach((control: FieldValueModel) => {
                                    this.formService.setControlValue(control.formControlName, control.value);
                                });
                                break;
                            default:
                                break;
                        }
                    });
                }
            });
        });
    }

    getSelectListFromService() {
        this.Fields.forEach((field: NgMatFormFields, i) => {
            if (field.hasOwnProperty('getListFromApi') && field.getListFromApi) {
                if (field.hasOwnProperty('api')) {
                    this.formService.getData(field.api).subscribe((response: any) => {
                        response.data.forEach((data: SelectList) => {
                            this.Fields[i].list.push(data);
                        });
                    }, error => {
                        console.log(error);
                    });
                }
            }
        });
    }

    loadDepenentSelectOnChange(event: NgMatFormFieldChangeModal) {
        this.Fields.forEach((field: NgMatFormFields, i) => {
            if (field.formControlName === event.controlName && field.hasOwnProperty('loadDepenentSelectOnChange')) {
                let index;
                this.Fields.forEach((x: NgMatFormFields, j) => {
                    if (x.formControlName === field.loadDepenentSelectOnChange.formControlName) {
                        index = j;
                    }
                });
                this.formService.getData(field.loadDepenentSelectOnChange.api).subscribe((response: any) => {
                    response.data.forEach((data: SelectList) => {
                        this.Fields[index].list.push(data);
                    });
                }, error => {
                    console.log(error);
                });
            }
        });
    }



    /* setOptionsByDefault() {
        this.options.hasOwnProperty('apperance') ? '' : this.options['apperance'] = 'legacy';
        this.options.hasOwnProperty('color') ? '' : this.options['color'] = 'primary';
        this.options.hasOwnProperty('floatLabel') ? '' : this.options['floatLabel'] = 'auto';
    } */

}




