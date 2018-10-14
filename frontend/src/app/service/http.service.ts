import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class HttpService {

    private baseServerUrl: string;
    constructor(private httpClient: HttpClient) {
        this.baseServerUrl = environment.baseServerUrl;
    }

    public get(relativeUrl: string): Observable<any> {
        return this.httpClient.get(this.baseServerUrl + '/' + relativeUrl);
    }
}
