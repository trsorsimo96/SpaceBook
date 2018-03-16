/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SpaceBookTestModule } from '../../../test.module';
import { AirlineComponent } from '../../../../../../main/webapp/app/entities/airline/airline.component';
import { AirlineService } from '../../../../../../main/webapp/app/entities/airline/airline.service';
import { Airline } from '../../../../../../main/webapp/app/entities/airline/airline.model';

describe('Component Tests', () => {

    describe('Airline Management Component', () => {
        let comp: AirlineComponent;
        let fixture: ComponentFixture<AirlineComponent>;
        let service: AirlineService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpaceBookTestModule],
                declarations: [AirlineComponent],
                providers: [
                    AirlineService
                ]
            })
            .overrideTemplate(AirlineComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AirlineComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AirlineService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Airline(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.airlines[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
