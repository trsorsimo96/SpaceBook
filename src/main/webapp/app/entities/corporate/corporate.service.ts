import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Corporate } from './corporate.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Corporate>;

@Injectable()
export class CorporateService {

    private resourceUrl =  SERVER_API_URL + 'api/corporates';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/corporates';

    constructor(private http: HttpClient) { }

    create(corporate: Corporate): Observable<EntityResponseType> {
        const copy = this.convert(corporate);
        return this.http.post<Corporate>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(corporate: Corporate): Observable<EntityResponseType> {
        const copy = this.convert(corporate);
        return this.http.put<Corporate>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Corporate>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Corporate[]>> {
        const options = createRequestOption(req);
        return this.http.get<Corporate[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Corporate[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<Corporate[]>> {
        const options = createRequestOption(req);
        return this.http.get<Corporate[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Corporate[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Corporate = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Corporate[]>): HttpResponse<Corporate[]> {
        const jsonResponse: Corporate[] = res.body;
        const body: Corporate[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Corporate.
     */
    private convertItemFromServer(corporate: Corporate): Corporate {
        const copy: Corporate = Object.assign({}, corporate);
        return copy;
    }

    /**
     * Convert a Corporate to a JSON which can be sent to the server.
     */
    private convert(corporate: Corporate): Corporate {
        const copy: Corporate = Object.assign({}, corporate);
        return copy;
    }
}
