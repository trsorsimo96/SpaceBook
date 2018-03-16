/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SpaceBookTestModule } from '../../../test.module';
import { PassengerComponent } from '../../../../../../main/webapp/app/entities/passenger/passenger.component';
import { PassengerService } from '../../../../../../main/webapp/app/entities/passenger/passenger.service';
import { Passenger } from '../../../../../../main/webapp/app/entities/passenger/passenger.model';

describe('Component Tests', () => {

    describe('Passenger Management Component', () => {
        let comp: PassengerComponent;
        let fixture: ComponentFixture<PassengerComponent>;
        let service: PassengerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpaceBookTestModule],
                declarations: [PassengerComponent],
                providers: [
                    PassengerService
                ]
            })
            .overrideTemplate(PassengerComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PassengerComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PassengerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Passenger(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.passengers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
