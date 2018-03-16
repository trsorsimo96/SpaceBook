/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SpaceBookTestModule } from '../../../test.module';
import { AddressInBookingDialogComponent } from '../../../../../../main/webapp/app/entities/address-in-booking/address-in-booking-dialog.component';
import { AddressInBookingService } from '../../../../../../main/webapp/app/entities/address-in-booking/address-in-booking.service';
import { AddressInBooking } from '../../../../../../main/webapp/app/entities/address-in-booking/address-in-booking.model';
import { CountryService } from '../../../../../../main/webapp/app/entities/country';
import { BookingService } from '../../../../../../main/webapp/app/entities/booking';

describe('Component Tests', () => {

    describe('AddressInBooking Management Dialog Component', () => {
        let comp: AddressInBookingDialogComponent;
        let fixture: ComponentFixture<AddressInBookingDialogComponent>;
        let service: AddressInBookingService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpaceBookTestModule],
                declarations: [AddressInBookingDialogComponent],
                providers: [
                    CountryService,
                    BookingService,
                    AddressInBookingService
                ]
            })
            .overrideTemplate(AddressInBookingDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AddressInBookingDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AddressInBookingService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AddressInBooking(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.addressInBooking = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'addressInBookingListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AddressInBooking();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.addressInBooking = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'addressInBookingListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
