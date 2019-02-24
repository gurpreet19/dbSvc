/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DbSvcTestModule } from '../../../test.module';
import { VisitorUpdateComponent } from 'app/entities/visitor/visitor-update.component';
import { VisitorService } from 'app/entities/visitor/visitor.service';
import { Visitor } from 'app/shared/model/visitor.model';

describe('Component Tests', () => {
    describe('Visitor Management Update Component', () => {
        let comp: VisitorUpdateComponent;
        let fixture: ComponentFixture<VisitorUpdateComponent>;
        let service: VisitorService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DbSvcTestModule],
                declarations: [VisitorUpdateComponent]
            })
                .overrideTemplate(VisitorUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(VisitorUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VisitorService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Visitor(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.visitor = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Visitor();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.visitor = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
