import { HttpHeaders, HttpParams } from '@angular/common/http';

export interface NgMatSelectListFromUrl {

    readonly url: string;

    readonly params: HttpParams | {
        [param: string]: string | string[];
    };

    readonly method: 'post' | 'get';

    readonly header: HttpHeaders | {
        [header: string]: string | string[];
    };

}