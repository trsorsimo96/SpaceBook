import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Town } from './town.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Town>;

@Injectable()
export class TownService {

    private resourceUrl =  SERVER_API_URL + 'api/towns';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/towns';

    constructor(private http: HttpClient) { }

    create(town: Town): Observable<EntityResponseType> {
        const copy = this.convert(town);
        return this.http.post<Town>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(town: Town): Observable<EntityResponseType> {
        const copy = this.convert(town);
        return this.http.put<Town>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Town>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Town[]>> {
        const options = createRequestOption(req);
        return this.http.get<Town[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Town[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<Town[]>> {
        const options = createRequestOption(req);
        return this.http.get<Town[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Town[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Town = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Town[]>): HttpResponse<Town[]> {
        const jsonResponse: Town[] = res.body;
        const body: Town[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Town.
     */
    private convertItemFromServer(town: Town): Town {
        const copy: Town = Object.assign({}, town);
        return copy;
    }

    /**
     * Convert a Town to a JSON which can be sent to the server.
     */
    private convert(town: Town): Town {
        const copy: Town = Object.assign({}, town);
        return copy;
    }
}
