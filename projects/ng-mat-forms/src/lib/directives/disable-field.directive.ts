import { Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: 'input[libDisableField]'
})
export class DisableFieldDirective {

    @Input('libDisableField') set disableField(condition: boolean) {
        const action = condition ? 'disable' : 'enable';
        this.ngControl.control[action]({ onlySelf: true });
    }

    constructor(private ngControl: NgControl) { }

}
