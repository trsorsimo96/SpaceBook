/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SpaceBookTestModule } from '../../../test.module';
import { AddressInBookingDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/address-in-booking/address-in-booking-delete-dialog.component';
import { AddressInBookingService } from '../../../../../../main/webapp/app/entities/address-in-booking/address-in-booking.service';

describe('Component Tests', () => {

    describe('AddressInBooking Management Delete Component', () => {
        let comp: AddressInBookingDeleteDialogComponent;
        let fixture: ComponentFixture<AddressInBookingDeleteDialogComponent>;
        let service: AddressInBookingService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpaceBookTestModule],
                declarations: [AddressInBookingDeleteDialogComponent],
                providers: [
                    AddressInBookingService
                ]
            })
            .overrideTemplate(AddressInBookingDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AddressInBookingDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AddressInBookingService);
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
