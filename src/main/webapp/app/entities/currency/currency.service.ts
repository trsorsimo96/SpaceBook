import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Currency } from './currency.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Currency>;

@Injectable()
export class CurrencyService {

    private resourceUrl =  SERVER_API_URL + 'api/currencies';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/currencies';

    constructor(private http: HttpClient) { }

    create(currency: Currency): Observable<EntityResponseType> {
        const copy = this.convert(currency);
        return this.http.post<Currency>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(currency: Currency): Observable<EntityResponseType> {
        const copy = this.convert(currency);
        return this.http.put<Currency>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Currency>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Currency[]>> {
        const options = createRequestOption(req);
        return this.http.get<Currency[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Currency[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<Currency[]>> {
        const options = createRequestOption(req);
        return this.http.get<Currency[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Currency[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Currency = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Currency[]>): HttpResponse<Currency[]> {
        const jsonResponse: Currency[] = res.body;
        const body: Currency[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Currency.
     */
    private convertItemFromServer(currency: Currency): Currency {
        const copy: Currency = Object.assign({}, currency);
        return copy;
    }

    /**
     * Convert a Currency to a JSON which can be sent to the server.
     */
    private convert(currency: Currency): Currency {
        const copy: Currency = Object.assign({}, currency);
        return copy;
    }
}
