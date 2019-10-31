import { Injectable, Directive, Input, ElementRef, HostListener, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class NgMatFormsService {
    FormGen: FormGroup;
    constructor() { }

    readonly setValue: any = (formControlName: string, value: any) => {
        this.FormGen.patchValue({ [formControlName]: value });
    }
}

@Directive({
    selector: 'input[numbersOnly]'
})
export class NumberOnlyDirective {
    @Input() numbersOnly: boolean = false;
    constructor(private _el: ElementRef) { }
    @HostListener('input', ['$event']) onInput(event) {
        if (this.numbersOnly) {
            const initalValue = this._el.nativeElement.value.replace(/[a-zA-Z]*/g, '');
            this._el.nativeElement.value = initalValue.replace(/[^\w\s]/gi, '');
            if (initalValue !== this._el.nativeElement.value) {
                event.stopPropagation();
            }
        }
    }
}

@Directive({
    selector: 'input[alphabetOnly]'
})
export class AlphabetOnlyDirective {
    @Input() alphabetOnly: boolean = false;
    constructor(private _el: ElementRef) { }
    @HostListener('input', ['$event']) onInput(event) {
        if (this.alphabetOnly) {
            const initalValue = this._el.nativeElement.value.replace(/[0-9]*/g, '');
            this._el.nativeElement.value = initalValue.replace(/[^\w\s]/gi, '');
            if (initalValue !== this._el.nativeElement.value) {
                event.stopPropagation();
            }
        }
    }
}

@Directive({
    selector: 'input[alphanumericOnly]'
})
export class AlphaNumericOnlyDirective {
    @Input() alphanumericOnly: boolean = false;
    constructor(private _el: ElementRef) { }
    @HostListener('input', ['$event']) onInput(event) {
        if (this.alphanumericOnly) {
            const initalValue = this._el.nativeElement.value;
            this._el.nativeElement.value = initalValue.replace(/[^\w\s]/gi, '');
            if (initalValue !== this._el.nativeElement.value) {
                event.stopPropagation();
            }
        }
    }
}

@Directive({
    selector: 'input[customRegex]'
})
export class customDirective {
    @Input() customRegex: boolean = false;
    @Input() regExp: any;
    constructor(private _el: ElementRef) { }
    @HostListener('input', ['$event']) onInput(event) {
        if (this.customRegex) {
            const initalValue = this._el.nativeElement.value;
            this._el.nativeElement.value = initalValue.replace(this.regExp, '');
            if (initalValue !== this._el.nativeElement.value) {
                event.stopPropagation();
            }
        }
    }
}

@Component({
    selector: 'error-message',
    template: `<p class='error' *ngIf='control.hasError'>{{getErrorMessages}}</p>`,
    styles: [
        `.error{
            color: #f44336;
        }`
    ]
})
export class ErrorMessageComponent {

    @Input() control: FormControl;
    @Input() Field: string;
    constructor() { }

    getErrorMessage() {
        if (this.control.hasError) {
            if (this.control.errors != null) {
                let error = Object.keys(this.control.errors)[0];
                return this.getErrorMessageField(error, this.control.errors[error]);
            }
            return '';
        }
    }

    getErrorMessageField(errors: string, obj: any) {
        let config = {
            required: `${this.Field} is required`,
            minlength: `Minimun Length for ${this.Field} is ${obj.requiredLength}`
        }
        return config[errors];
    }

}

