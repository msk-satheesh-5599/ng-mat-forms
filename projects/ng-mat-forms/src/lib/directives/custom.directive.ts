import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: 'input[customRegex]'
})
export class customDirective {
    @Input() customRegex: boolean = false;
    @Input() regExp: any;
    constructor(private _el: ElementRef) { }
    @HostListener('input', ['$event'])
    @HostListener('copy', ['$event'])
    onInput(event) {
        if (this.customRegex) {
            const initalValue = this._el.nativeElement.value;
            this._el.nativeElement.value = initalValue.replace(this.regExp, '');
            if (initalValue !== this._el.nativeElement.value) {
                event.stopPropagation();
            }
        }
    }
}