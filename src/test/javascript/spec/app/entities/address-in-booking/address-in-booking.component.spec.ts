/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SpaceBookTestModule } from '../../../test.module';
import { AddressInBookingComponent } from '../../../../../../main/webapp/app/entities/address-in-booking/address-in-booking.component';
import { AddressInBookingService } from '../../../../../../main/webapp/app/entities/address-in-booking/address-in-booking.service';
import { AddressInBooking } from '../../../../../../main/webapp/app/entities/address-in-booking/address-in-booking.model';

describe('Component Tests', () => {

    describe('AddressInBooking Management Component', () => {
        let comp: AddressInBookingComponent;
        let fixture: ComponentFixture<AddressInBookingComponent>;
        let service: AddressInBookingService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpaceBookTestModule],
                declarations: [AddressInBookingComponent],
                providers: [
                    AddressInBookingService
                ]
            })
            .overrideTemplate(AddressInBookingComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AddressInBookingComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AddressInBookingService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new AddressInBooking(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.addressInBookings[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
