import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ConfigFees } from './config-fees.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ConfigFees>;

@Injectable()
export class ConfigFeesService {

    private resourceUrl =  SERVER_API_URL + 'api/config-fees';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/config-fees';

    constructor(private http: HttpClient) { }

    create(configFees: ConfigFees): Observable<EntityResponseType> {
        const copy = this.convert(configFees);
        return this.http.post<ConfigFees>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(configFees: ConfigFees): Observable<EntityResponseType> {
        const copy = this.convert(configFees);
        return this.http.put<ConfigFees>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ConfigFees>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ConfigFees[]>> {
        const options = createRequestOption(req);
        return this.http.get<ConfigFees[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ConfigFees[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<ConfigFees[]>> {
        const options = createRequestOption(req);
        return this.http.get<ConfigFees[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ConfigFees[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ConfigFees = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ConfigFees[]>): HttpResponse<ConfigFees[]> {
        const jsonResponse: ConfigFees[] = res.body;
        const body: ConfigFees[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ConfigFees.
     */
    private convertItemFromServer(configFees: ConfigFees): ConfigFees {
        const copy: ConfigFees = Object.assign({}, configFees);
        return copy;
    }

    /**
     * Convert a ConfigFees to a JSON which can be sent to the server.
     */
    private convert(configFees: ConfigFees): ConfigFees {
        const copy: ConfigFees = Object.assign({}, configFees);
        return copy;
    }
}
