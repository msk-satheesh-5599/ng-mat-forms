import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: 'input[libNumbersOnly]'
})
export class NumberOnlyDirective {
    @Input('libNumbersOnly') libNumbersOnly = false;
    constructor(private elementRef: ElementRef) { }
    @HostListener('input', ['$event'])
    @HostListener('copy', ['$event'])
    @HostListener('keydown', ['$event'])
    onInput(event) {
        if (this.libNumbersOnly) {
            const initalValue = this.elementRef.nativeElement.value.replace(/[a-zA-Z]*/g, '');
            this.elementRef.nativeElement.value = initalValue.replace(/[^\w\s]/gi, '');
            if (initalValue !== this.elementRef.nativeElement.value) {
                event.stopPropagation();
            }
        }
    }
}
