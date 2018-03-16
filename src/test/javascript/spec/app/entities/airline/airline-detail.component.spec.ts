/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SpaceBookTestModule } from '../../../test.module';
import { AirlineDetailComponent } from '../../../../../../main/webapp/app/entities/airline/airline-detail.component';
import { AirlineService } from '../../../../../../main/webapp/app/entities/airline/airline.service';
import { Airline } from '../../../../../../main/webapp/app/entities/airline/airline.model';

describe('Component Tests', () => {

    describe('Airline Management Detail Component', () => {
        let comp: AirlineDetailComponent;
        let fixture: ComponentFixture<AirlineDetailComponent>;
        let service: AirlineService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpaceBookTestModule],
                declarations: [AirlineDetailComponent],
                providers: [
                    AirlineService
                ]
            })
            .overrideTemplate(AirlineDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AirlineDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AirlineService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Airline(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.airline).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
