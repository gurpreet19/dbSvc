/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { VisitorService } from 'app/entities/visitor/visitor.service';
import { IVisitor, Visitor, VisitorType } from 'app/shared/model/visitor.model';

describe('Service Tests', () => {
    describe('Visitor Service', () => {
        let injector: TestBed;
        let service: VisitorService;
        let httpMock: HttpTestingController;
        let elemDefault: IVisitor;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(VisitorService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new Visitor(
                0,
                'AAAAAAA',
                0,
                VisitorType.NEWJOINEE,
                currentDate,
                currentDate,
                'AAAAAAA',
                'AAAAAAA',
                0,
                false,
                'AAAAAAA'
            );
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        allowedFrom: currentDate.format(DATE_TIME_FORMAT),
                        allowedTo: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a Visitor', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        allowedFrom: currentDate.format(DATE_TIME_FORMAT),
                        allowedTo: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        allowedFrom: currentDate,
                        allowedTo: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new Visitor(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Visitor', async () => {
                const returnedFromService = Object.assign(
                    {
                        name: 'BBBBBB',
                        visitorId: 1,
                        type: 'BBBBBB',
                        allowedFrom: currentDate.format(DATE_TIME_FORMAT),
                        allowedTo: currentDate.format(DATE_TIME_FORMAT),
                        location: 'BBBBBB',
                        email: 'BBBBBB',
                        phone: 1,
                        status: true,
                        qrString: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        allowedFrom: currentDate,
                        allowedTo: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of Visitor', async () => {
                const returnedFromService = Object.assign(
                    {
                        name: 'BBBBBB',
                        visitorId: 1,
                        type: 'BBBBBB',
                        allowedFrom: currentDate.format(DATE_TIME_FORMAT),
                        allowedTo: currentDate.format(DATE_TIME_FORMAT),
                        location: 'BBBBBB',
                        email: 'BBBBBB',
                        phone: 1,
                        status: true,
                        qrString: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        allowedFrom: currentDate,
                        allowedTo: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a Visitor', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
