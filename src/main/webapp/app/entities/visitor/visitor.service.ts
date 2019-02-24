import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IVisitor } from 'app/shared/model/visitor.model';

type EntityResponseType = HttpResponse<IVisitor>;
type EntityArrayResponseType = HttpResponse<IVisitor[]>;

@Injectable({ providedIn: 'root' })
export class VisitorService {
    public resourceUrl = SERVER_API_URL + 'api/visitors';

    constructor(protected http: HttpClient) {}

    create(visitor: IVisitor): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(visitor);
        return this.http
            .post<IVisitor>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(visitor: IVisitor): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(visitor);
        return this.http
            .put<IVisitor>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IVisitor>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IVisitor[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(visitor: IVisitor): IVisitor {
        const copy: IVisitor = Object.assign({}, visitor, {
            allowedFrom: visitor.allowedFrom != null && visitor.allowedFrom.isValid() ? visitor.allowedFrom.toJSON() : null,
            allowedTo: visitor.allowedTo != null && visitor.allowedTo.isValid() ? visitor.allowedTo.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.allowedFrom = res.body.allowedFrom != null ? moment(res.body.allowedFrom) : null;
            res.body.allowedTo = res.body.allowedTo != null ? moment(res.body.allowedTo) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((visitor: IVisitor) => {
                visitor.allowedFrom = visitor.allowedFrom != null ? moment(visitor.allowedFrom) : null;
                visitor.allowedTo = visitor.allowedTo != null ? moment(visitor.allowedTo) : null;
            });
        }
        return res;
    }
}
