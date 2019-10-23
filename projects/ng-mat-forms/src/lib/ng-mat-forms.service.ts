import { Injectable, Directive, Input, ElementRef, HostListener } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class NgMatFormsService {


    constructor() { }
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

