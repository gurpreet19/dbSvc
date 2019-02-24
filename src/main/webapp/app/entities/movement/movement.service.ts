import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMovement } from 'app/shared/model/movement.model';

type EntityResponseType = HttpResponse<IMovement>;
type EntityArrayResponseType = HttpResponse<IMovement[]>;

@Injectable({ providedIn: 'root' })
export class MovementService {
    public resourceUrl = SERVER_API_URL + 'api/movements';

    constructor(protected http: HttpClient) {}

    create(movement: IMovement): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(movement);
        return this.http
            .post<IMovement>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(movement: IMovement): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(movement);
        return this.http
            .put<IMovement>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IMovement>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IMovement[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(movement: IMovement): IMovement {
        const copy: IMovement = Object.assign({}, movement, {
            timeStamp: movement.timeStamp != null && movement.timeStamp.isValid() ? movement.timeStamp.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.timeStamp = res.body.timeStamp != null ? moment(res.body.timeStamp) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((movement: IMovement) => {
                movement.timeStamp = movement.timeStamp != null ? moment(movement.timeStamp) : null;
            });
        }
        return res;
    }
}
