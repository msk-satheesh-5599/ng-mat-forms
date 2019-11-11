export interface selectlist {

    name: string;

    type?: 'option' | 'optionGroup';

    value: string | selectlist[];

}