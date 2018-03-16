/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SpaceBookTestModule } from '../../../test.module';
import { PhoneInBookingDetailComponent } from '../../../../../../main/webapp/app/entities/phone-in-booking/phone-in-booking-detail.component';
import { PhoneInBookingService } from '../../../../../../main/webapp/app/entities/phone-in-booking/phone-in-booking.service';
import { PhoneInBooking } from '../../../../../../main/webapp/app/entities/phone-in-booking/phone-in-booking.model';

describe('Component Tests', () => {

    describe('PhoneInBooking Management Detail Component', () => {
        let comp: PhoneInBookingDetailComponent;
        let fixture: ComponentFixture<PhoneInBookingDetailComponent>;
        let service: PhoneInBookingService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpaceBookTestModule],
                declarations: [PhoneInBookingDetailComponent],
                providers: [
                    PhoneInBookingService
                ]
            })
            .overrideTemplate(PhoneInBookingDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PhoneInBookingDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PhoneInBookingService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new PhoneInBooking(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.phoneInBooking).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
