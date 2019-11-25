import { ThemePalette, MatFormFieldAppearance, FloatLabelType } from '@angular/material';

export interface NgMatFormOptions {

    readonly column: number;

    readonly errorMsgOnSubmit?: boolean

    appearance?: MatFormFieldAppearance;

    color?: ThemePalette;

    floatLabel?: FloatLabelType

}