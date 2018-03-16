import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Agency } from './agency.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Agency>;

@Injectable()
export class AgencyService {

    private resourceUrl =  SERVER_API_URL + 'api/agencies';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/agencies';

    constructor(private http: HttpClient) { }

    create(agency: Agency): Observable<EntityResponseType> {
        const copy = this.convert(agency);
        return this.http.post<Agency>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(agency: Agency): Observable<EntityResponseType> {
        const copy = this.convert(agency);
        return this.http.put<Agency>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Agency>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Agency[]>> {
        const options = createRequestOption(req);
        return this.http.get<Agency[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Agency[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<Agency[]>> {
        const options = createRequestOption(req);
        return this.http.get<Agency[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Agency[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Agency = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Agency[]>): HttpResponse<Agency[]> {
        const jsonResponse: Agency[] = res.body;
        const body: Agency[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Agency.
     */
    private convertItemFromServer(agency: Agency): Agency {
        const copy: Agency = Object.assign({}, agency);
        return copy;
    }

    /**
     * Convert a Agency to a JSON which can be sent to the server.
     */
    private convert(agency: Agency): Agency {
        const copy: Agency = Object.assign({}, agency);
        return copy;
    }
}
