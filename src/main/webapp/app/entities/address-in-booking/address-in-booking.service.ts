import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { AddressInBooking } from './address-in-booking.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<AddressInBooking>;

@Injectable()
export class AddressInBookingService {

    private resourceUrl =  SERVER_API_URL + 'api/address-in-bookings';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/address-in-bookings';

    constructor(private http: HttpClient) { }

    create(addressInBooking: AddressInBooking): Observable<EntityResponseType> {
        const copy = this.convert(addressInBooking);
        return this.http.post<AddressInBooking>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(addressInBooking: AddressInBooking): Observable<EntityResponseType> {
        const copy = this.convert(addressInBooking);
        return this.http.put<AddressInBooking>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<AddressInBooking>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<AddressInBooking[]>> {
        const options = createRequestOption(req);
        return this.http.get<AddressInBooking[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AddressInBooking[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<AddressInBooking[]>> {
        const options = createRequestOption(req);
        return this.http.get<AddressInBooking[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AddressInBooking[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: AddressInBooking = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<AddressInBooking[]>): HttpResponse<AddressInBooking[]> {
        const jsonResponse: AddressInBooking[] = res.body;
        const body: AddressInBooking[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to AddressInBooking.
     */
    private convertItemFromServer(addressInBooking: AddressInBooking): AddressInBooking {
        const copy: AddressInBooking = Object.assign({}, addressInBooking);
        return copy;
    }

    /**
     * Convert a AddressInBooking to a JSON which can be sent to the server.
     */
    private convert(addressInBooking: AddressInBooking): AddressInBooking {
        const copy: AddressInBooking = Object.assign({}, addressInBooking);
        return copy;
    }
}
