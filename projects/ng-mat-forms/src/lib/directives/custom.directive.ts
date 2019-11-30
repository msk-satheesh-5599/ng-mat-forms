import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: 'input[libCustomRegex]'
})
export class CustomDirective {
    @Input() libCustomRegex = false;
    @Input() regExp: any;
    constructor(private elementRef: ElementRef) { }
    @HostListener('input', ['$event'])
    @HostListener('copy', ['$event'])
    onInput(event) {
        if (this.libCustomRegex) {
            const initalValue = this.elementRef.nativeElement.value;
            this.elementRef.nativeElement.value = initalValue.replace(this.regExp, '');
            if (initalValue !== this.elementRef.nativeElement.value) {
                event.stopPropagation();
            }
        }
    }
}
