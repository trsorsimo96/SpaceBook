/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SpaceBookTestModule } from '../../../test.module';
import { PhoneInBookingDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/phone-in-booking/phone-in-booking-delete-dialog.component';
import { PhoneInBookingService } from '../../../../../../main/webapp/app/entities/phone-in-booking/phone-in-booking.service';

describe('Component Tests', () => {

    describe('PhoneInBooking Management Delete Component', () => {
        let comp: PhoneInBookingDeleteDialogComponent;
        let fixture: ComponentFixture<PhoneInBookingDeleteDialogComponent>;
        let service: PhoneInBookingService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpaceBookTestModule],
                declarations: [PhoneInBookingDeleteDialogComponent],
                providers: [
                    PhoneInBookingService
                ]
            })
            .overrideTemplate(PhoneInBookingDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PhoneInBookingDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PhoneInBookingService);
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
