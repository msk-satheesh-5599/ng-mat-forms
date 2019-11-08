import { Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: 'input[disableField]'
})
export class DisableFieldDirective {

    @Input() set disableField(condition: boolean) {
        const action = condition ? 'disable' : 'enable';
        this.ngControl.control[action]({ onlySelf: true });
    }

    constructor(private ngControl: NgControl) { }

}