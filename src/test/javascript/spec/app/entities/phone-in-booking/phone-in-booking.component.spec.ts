/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SpaceBookTestModule } from '../../../test.module';
import { PhoneInBookingComponent } from '../../../../../../main/webapp/app/entities/phone-in-booking/phone-in-booking.component';
import { PhoneInBookingService } from '../../../../../../main/webapp/app/entities/phone-in-booking/phone-in-booking.service';
import { PhoneInBooking } from '../../../../../../main/webapp/app/entities/phone-in-booking/phone-in-booking.model';

describe('Component Tests', () => {

    describe('PhoneInBooking Management Component', () => {
        let comp: PhoneInBookingComponent;
        let fixture: ComponentFixture<PhoneInBookingComponent>;
        let service: PhoneInBookingService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpaceBookTestModule],
                declarations: [PhoneInBookingComponent],
                providers: [
                    PhoneInBookingService
                ]
            })
            .overrideTemplate(PhoneInBookingComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PhoneInBookingComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PhoneInBookingService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new PhoneInBooking(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.phoneInBookings[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
