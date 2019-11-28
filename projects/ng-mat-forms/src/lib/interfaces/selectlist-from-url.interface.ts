
export type ParamList = {
    [key: string]: any;
}

export interface NgMatSelectListFromUrl {

    readonly url: string;

    readonly params: ParamList;

    readonly method: 'post' | 'get';

    readonly header: any;

}