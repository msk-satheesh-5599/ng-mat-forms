import { ThemePalette, MatFormFieldAppearance, FloatLabelType } from '@angular/material';

export interface NgMatFormOptions {

    readonly column: number;

    readonly errorMsgOnSubmit?: boolean

    apperance?: MatFormFieldAppearance;

    color?: ThemePalette;

    floatLabel?: FloatLabelType

}