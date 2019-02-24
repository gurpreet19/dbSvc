/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DbSvcTestModule } from '../../../test.module';
import { MovementComponent } from 'app/entities/movement/movement.component';
import { MovementService } from 'app/entities/movement/movement.service';
import { Movement } from 'app/shared/model/movement.model';

describe('Component Tests', () => {
    describe('Movement Management Component', () => {
        let comp: MovementComponent;
        let fixture: ComponentFixture<MovementComponent>;
        let service: MovementService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DbSvcTestModule],
                declarations: [MovementComponent],
                providers: []
            })
                .overrideTemplate(MovementComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MovementComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MovementService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Movement(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.movements[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
