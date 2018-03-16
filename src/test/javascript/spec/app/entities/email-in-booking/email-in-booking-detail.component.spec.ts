/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SpaceBookTestModule } from '../../../test.module';
import { EmailInBookingDetailComponent } from '../../../../../../main/webapp/app/entities/email-in-booking/email-in-booking-detail.component';
import { EmailInBookingService } from '../../../../../../main/webapp/app/entities/email-in-booking/email-in-booking.service';
import { EmailInBooking } from '../../../../../../main/webapp/app/entities/email-in-booking/email-in-booking.model';

describe('Component Tests', () => {

    describe('EmailInBooking Management Detail Component', () => {
        let comp: EmailInBookingDetailComponent;
        let fixture: ComponentFixture<EmailInBookingDetailComponent>;
        let service: EmailInBookingService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpaceBookTestModule],
                declarations: [EmailInBookingDetailComponent],
                providers: [
                    EmailInBookingService
                ]
            })
            .overrideTemplate(EmailInBookingDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmailInBookingDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmailInBookingService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new EmailInBooking(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.emailInBooking).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
