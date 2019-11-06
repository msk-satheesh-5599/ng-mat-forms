import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: 'input[numbersOnly]'
})
export class NumberOnlyDirective {
    @Input() numbersOnly: boolean = false;
    constructor(private _el: ElementRef) { }
    @HostListener('input', ['$event'])
    @HostListener('copy', ['$event'])
    @HostListener('keydown', ['$event'])
    onInput(event) {
        if (this.numbersOnly) {
            const initalValue = this._el.nativeElement.value.replace(/[a-zA-Z]*/g, '');
            this._el.nativeElement.value = initalValue.replace(/[^\w\s]/gi, '');
            if (initalValue !== this._el.nativeElement.value) {
                event.stopPropagation();
            }
        }
    }
}