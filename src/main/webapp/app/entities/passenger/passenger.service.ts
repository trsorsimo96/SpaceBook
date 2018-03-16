import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Passenger } from './passenger.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Passenger>;

@Injectable()
export class PassengerService {

    private resourceUrl =  SERVER_API_URL + 'api/passengers';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/passengers';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(passenger: Passenger): Observable<EntityResponseType> {
        const copy = this.convert(passenger);
        return this.http.post<Passenger>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(passenger: Passenger): Observable<EntityResponseType> {
        const copy = this.convert(passenger);
        return this.http.put<Passenger>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Passenger>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Passenger[]>> {
        const options = createRequestOption(req);
        return this.http.get<Passenger[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Passenger[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<Passenger[]>> {
        const options = createRequestOption(req);
        return this.http.get<Passenger[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Passenger[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Passenger = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Passenger[]>): HttpResponse<Passenger[]> {
        const jsonResponse: Passenger[] = res.body;
        const body: Passenger[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Passenger.
     */
    private convertItemFromServer(passenger: Passenger): Passenger {
        const copy: Passenger = Object.assign({}, passenger);
        copy.birthday = this.dateUtils
            .convertLocalDateFromServer(passenger.birthday);
        return copy;
    }

    /**
     * Convert a Passenger to a JSON which can be sent to the server.
     */
    private convert(passenger: Passenger): Passenger {
        const copy: Passenger = Object.assign({}, passenger);
        copy.birthday = this.dateUtils
            .convertLocalDateToServer(passenger.birthday);
        return copy;
    }
}
