import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { PhoneInBooking } from './phone-in-booking.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PhoneInBooking>;

@Injectable()
export class PhoneInBookingService {

    private resourceUrl =  SERVER_API_URL + 'api/phone-in-bookings';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/phone-in-bookings';

    constructor(private http: HttpClient) { }

    create(phoneInBooking: PhoneInBooking): Observable<EntityResponseType> {
        const copy = this.convert(phoneInBooking);
        return this.http.post<PhoneInBooking>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(phoneInBooking: PhoneInBooking): Observable<EntityResponseType> {
        const copy = this.convert(phoneInBooking);
        return this.http.put<PhoneInBooking>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PhoneInBooking>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PhoneInBooking[]>> {
        const options = createRequestOption(req);
        return this.http.get<PhoneInBooking[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PhoneInBooking[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<PhoneInBooking[]>> {
        const options = createRequestOption(req);
        return this.http.get<PhoneInBooking[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PhoneInBooking[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PhoneInBooking = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PhoneInBooking[]>): HttpResponse<PhoneInBooking[]> {
        const jsonResponse: PhoneInBooking[] = res.body;
        const body: PhoneInBooking[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PhoneInBooking.
     */
    private convertItemFromServer(phoneInBooking: PhoneInBooking): PhoneInBooking {
        const copy: PhoneInBooking = Object.assign({}, phoneInBooking);
        return copy;
    }

    /**
     * Convert a PhoneInBooking to a JSON which can be sent to the server.
     */
    private convert(phoneInBooking: PhoneInBooking): PhoneInBooking {
        const copy: PhoneInBooking = Object.assign({}, phoneInBooking);
        return copy;
    }
}
