/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SpaceBookTestModule } from '../../../test.module';
import { AirlineDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/airline/airline-delete-dialog.component';
import { AirlineService } from '../../../../../../main/webapp/app/entities/airline/airline.service';

describe('Component Tests', () => {

    describe('Airline Management Delete Component', () => {
        let comp: AirlineDeleteDialogComponent;
        let fixture: ComponentFixture<AirlineDeleteDialogComponent>;
        let service: AirlineService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpaceBookTestModule],
                declarations: [AirlineDeleteDialogComponent],
                providers: [
                    AirlineService
                ]
            })
            .overrideTemplate(AirlineDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AirlineDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AirlineService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
