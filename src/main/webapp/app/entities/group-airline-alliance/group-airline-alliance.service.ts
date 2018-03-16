import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { GroupAirlineAlliance } from './group-airline-alliance.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<GroupAirlineAlliance>;

@Injectable()
export class GroupAirlineAllianceService {

    private resourceUrl =  SERVER_API_URL + 'api/group-airline-alliances';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/group-airline-alliances';

    constructor(private http: HttpClient) { }

    create(groupAirlineAlliance: GroupAirlineAlliance): Observable<EntityResponseType> {
        const copy = this.convert(groupAirlineAlliance);
        return this.http.post<GroupAirlineAlliance>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(groupAirlineAlliance: GroupAirlineAlliance): Observable<EntityResponseType> {
        const copy = this.convert(groupAirlineAlliance);
        return this.http.put<GroupAirlineAlliance>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<GroupAirlineAlliance>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<GroupAirlineAlliance[]>> {
        const options = createRequestOption(req);
        return this.http.get<GroupAirlineAlliance[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<GroupAirlineAlliance[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<GroupAirlineAlliance[]>> {
        const options = createRequestOption(req);
        return this.http.get<GroupAirlineAlliance[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<GroupAirlineAlliance[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: GroupAirlineAlliance = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<GroupAirlineAlliance[]>): HttpResponse<GroupAirlineAlliance[]> {
        const jsonResponse: GroupAirlineAlliance[] = res.body;
        const body: GroupAirlineAlliance[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to GroupAirlineAlliance.
     */
    private convertItemFromServer(groupAirlineAlliance: GroupAirlineAlliance): GroupAirlineAlliance {
        const copy: GroupAirlineAlliance = Object.assign({}, groupAirlineAlliance);
        return copy;
    }

    /**
     * Convert a GroupAirlineAlliance to a JSON which can be sent to the server.
     */
    private convert(groupAirlineAlliance: GroupAirlineAlliance): GroupAirlineAlliance {
        const copy: GroupAirlineAlliance = Object.assign({}, groupAirlineAlliance);
        return copy;
    }
}
