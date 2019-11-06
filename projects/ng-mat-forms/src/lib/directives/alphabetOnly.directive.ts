import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: 'input[alphabetOnly]'
})
export class AlphabetOnlyDirective {
    @Input() alphabetOnly: boolean = false;
    constructor(private _el: ElementRef) { }
    @HostListener('input', ['$event'])
    @HostListener('copy', ['$event'])
    onInput(event) {
        if (this.alphabetOnly) {
            const initalValue = this._el.nativeElement.value.replace(/[0-9]*/g, '');
            this._el.nativeElement.value = initalValue.replace(/[^\w\s]/gi, '');
            if (initalValue !== this._el.nativeElement.value) {
                event.stopPropagation();
            }
        }
    }
}