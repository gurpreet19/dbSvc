/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { DbSvcTestModule } from '../../../test.module';
import { VisitorDeleteDialogComponent } from 'app/entities/visitor/visitor-delete-dialog.component';
import { VisitorService } from 'app/entities/visitor/visitor.service';

describe('Component Tests', () => {
    describe('Visitor Management Delete Component', () => {
        let comp: VisitorDeleteDialogComponent;
        let fixture: ComponentFixture<VisitorDeleteDialogComponent>;
        let service: VisitorService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DbSvcTestModule],
                declarations: [VisitorDeleteDialogComponent]
            })
                .overrideTemplate(VisitorDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(VisitorDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VisitorService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
