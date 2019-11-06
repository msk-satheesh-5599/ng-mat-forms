import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: 'input[alphanumericOnly]'
})
export class AlphaNumericOnlyDirective {
    @Input() alphanumericOnly: boolean = false;
    constructor(private _el: ElementRef) { }
    @HostListener('input', ['$event'])
    @HostListener('copy', ['$event'])
    onInput(event) {
        if (this.alphanumericOnly) {
            const initalValue = this._el.nativeElement.value;
            this._el.nativeElement.value = initalValue.replace(/[^\w\s]/gi, '');
            if (initalValue !== this._el.nativeElement.value) {
                event.stopPropagation();
            }
        }
    }
}