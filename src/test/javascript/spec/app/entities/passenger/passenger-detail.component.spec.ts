/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SpaceBookTestModule } from '../../../test.module';
import { PassengerDetailComponent } from '../../../../../../main/webapp/app/entities/passenger/passenger-detail.component';
import { PassengerService } from '../../../../../../main/webapp/app/entities/passenger/passenger.service';
import { Passenger } from '../../../../../../main/webapp/app/entities/passenger/passenger.model';

describe('Component Tests', () => {

    describe('Passenger Management Detail Component', () => {
        let comp: PassengerDetailComponent;
        let fixture: ComponentFixture<PassengerDetailComponent>;
        let service: PassengerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpaceBookTestModule],
                declarations: [PassengerDetailComponent],
                providers: [
                    PassengerService
                ]
            })
            .overrideTemplate(PassengerDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PassengerDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PassengerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Passenger(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.passenger).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
