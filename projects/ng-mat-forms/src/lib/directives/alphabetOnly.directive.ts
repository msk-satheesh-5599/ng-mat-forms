import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: 'input[libAlphabetOnly]'
})
export class AlphabetOnlyDirective {
    @Input('libAlphabetOnly') libAlphabetOnly = false;
    constructor(private elementRef: ElementRef) { }
    @HostListener('input', ['$event'])
    @HostListener('copy', ['$event'])
    onInput(event) {
        if (this.libAlphabetOnly) {
            const initalValue = this.elementRef.nativeElement.value.replace(/[0-9]*/g, '');
            this.elementRef.nativeElement.value = initalValue.replace(/[^\w\s]/gi, '');
            if (initalValue !== this.elementRef.nativeElement.value) {
                event.stopPropagation();
            }
        }
    }
}
