import { ThemePalette, MatFormFieldAppearance, FloatLabelType } from '@angular/material';

export interface NgMatFormOptions {

    readonly column: number;

    readonly errorMsgOnSubmit?: boolean

    readonly apperance?: MatFormFieldAppearance;

    readonly color?: ThemePalette;

    readonly floatLabel?: FloatLabelType

}