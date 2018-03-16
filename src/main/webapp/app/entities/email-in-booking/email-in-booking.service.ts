import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { EmailInBooking } from './email-in-booking.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<EmailInBooking>;

@Injectable()
export class EmailInBookingService {

    private resourceUrl =  SERVER_API_URL + 'api/email-in-bookings';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/email-in-bookings';

    constructor(private http: HttpClient) { }

    create(emailInBooking: EmailInBooking): Observable<EntityResponseType> {
        const copy = this.convert(emailInBooking);
        return this.http.post<EmailInBooking>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(emailInBooking: EmailInBooking): Observable<EntityResponseType> {
        const copy = this.convert(emailInBooking);
        return this.http.put<EmailInBooking>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<EmailInBooking>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<EmailInBooking[]>> {
        const options = createRequestOption(req);
        return this.http.get<EmailInBooking[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<EmailInBooking[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<EmailInBooking[]>> {
        const options = createRequestOption(req);
        return this.http.get<EmailInBooking[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<EmailInBooking[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: EmailInBooking = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<EmailInBooking[]>): HttpResponse<EmailInBooking[]> {
        const jsonResponse: EmailInBooking[] = res.body;
        const body: EmailInBooking[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to EmailInBooking.
     */
    private convertItemFromServer(emailInBooking: EmailInBooking): EmailInBooking {
        const copy: EmailInBooking = Object.assign({}, emailInBooking);
        return copy;
    }

    /**
     * Convert a EmailInBooking to a JSON which can be sent to the server.
     */
    private convert(emailInBooking: EmailInBooking): EmailInBooking {
        const copy: EmailInBooking = Object.assign({}, emailInBooking);
        return copy;
    }
}
