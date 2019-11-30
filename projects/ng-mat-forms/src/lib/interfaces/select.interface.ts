export interface SelectList {

    name: string;

    type?: 'option' | 'optionGroup';

    value: string | SelectList[];

}
