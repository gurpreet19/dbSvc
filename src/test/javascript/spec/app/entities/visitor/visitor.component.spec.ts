/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DbSvcTestModule } from '../../../test.module';
import { VisitorComponent } from 'app/entities/visitor/visitor.component';
import { VisitorService } from 'app/entities/visitor/visitor.service';
import { Visitor } from 'app/shared/model/visitor.model';

describe('Component Tests', () => {
    describe('Visitor Management Component', () => {
        let comp: VisitorComponent;
        let fixture: ComponentFixture<VisitorComponent>;
        let service: VisitorService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DbSvcTestModule],
                declarations: [VisitorComponent],
                providers: []
            })
                .overrideTemplate(VisitorComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(VisitorComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VisitorService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Visitor(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.visitors[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
