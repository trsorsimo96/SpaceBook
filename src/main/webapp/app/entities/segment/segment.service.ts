import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Segment } from './segment.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Segment>;

@Injectable()
export class SegmentService {

    private resourceUrl =  SERVER_API_URL + 'api/segments';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/segments';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(segment: Segment): Observable<EntityResponseType> {
        const copy = this.convert(segment);
        return this.http.post<Segment>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(segment: Segment): Observable<EntityResponseType> {
        const copy = this.convert(segment);
        return this.http.put<Segment>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Segment>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Segment[]>> {
        const options = createRequestOption(req);
        return this.http.get<Segment[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Segment[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<Segment[]>> {
        const options = createRequestOption(req);
        return this.http.get<Segment[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Segment[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Segment = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Segment[]>): HttpResponse<Segment[]> {
        const jsonResponse: Segment[] = res.body;
        const body: Segment[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Segment.
     */
    private convertItemFromServer(segment: Segment): Segment {
        const copy: Segment = Object.assign({}, segment);
        copy.date = this.dateUtils
            .convertLocalDateFromServer(segment.date);
        return copy;
    }

    /**
     * Convert a Segment to a JSON which can be sent to the server.
     */
    private convert(segment: Segment): Segment {
        const copy: Segment = Object.assign({}, segment);
        copy.date = this.dateUtils
            .convertLocalDateToServer(segment.date);
        return copy;
    }
}
