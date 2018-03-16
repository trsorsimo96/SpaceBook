/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SpaceBookTestModule } from '../../../test.module';
import { AddressInBookingDetailComponent } from '../../../../../../main/webapp/app/entities/address-in-booking/address-in-booking-detail.component';
import { AddressInBookingService } from '../../../../../../main/webapp/app/entities/address-in-booking/address-in-booking.service';
import { AddressInBooking } from '../../../../../../main/webapp/app/entities/address-in-booking/address-in-booking.model';

describe('Component Tests', () => {

    describe('AddressInBooking Management Detail Component', () => {
        let comp: AddressInBookingDetailComponent;
        let fixture: ComponentFixture<AddressInBookingDetailComponent>;
        let service: AddressInBookingService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpaceBookTestModule],
                declarations: [AddressInBookingDetailComponent],
                providers: [
                    AddressInBookingService
                ]
            })
            .overrideTemplate(AddressInBookingDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AddressInBookingDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AddressInBookingService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new AddressInBooking(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.addressInBooking).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
