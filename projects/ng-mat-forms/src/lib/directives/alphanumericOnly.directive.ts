import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: 'input[libAlphanumericOnly]'
})
export class AlphaNumericOnlyDirective {
    @Input('libAlphanumericOnly') libAlphanumericOnly = false;
    constructor(private elementRef: ElementRef) { }
    @HostListener('input', ['$event'])
    @HostListener('copy', ['$event'])
    onInput(event) {
        if (this.libAlphanumericOnly) {
            const initalValue = this.elementRef.nativeElement.value;
            this.elementRef.nativeElement.value = initalValue.replace(/[^\w\s]/gi, '');
            if (initalValue !== this.elementRef.nativeElement.value) {
                event.stopPropagation();
            }
        }
    }
}
