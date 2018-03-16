/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SpaceBookTestModule } from '../../../test.module';
import { EmailInBookingComponent } from '../../../../../../main/webapp/app/entities/email-in-booking/email-in-booking.component';
import { EmailInBookingService } from '../../../../../../main/webapp/app/entities/email-in-booking/email-in-booking.service';
import { EmailInBooking } from '../../../../../../main/webapp/app/entities/email-in-booking/email-in-booking.model';

describe('Component Tests', () => {

    describe('EmailInBooking Management Component', () => {
        let comp: EmailInBookingComponent;
        let fixture: ComponentFixture<EmailInBookingComponent>;
        let service: EmailInBookingService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpaceBookTestModule],
                declarations: [EmailInBookingComponent],
                providers: [
                    EmailInBookingService
                ]
            })
            .overrideTemplate(EmailInBookingComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(EmailInBookingComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmailInBookingService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new EmailInBooking(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.emailInBookings[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
