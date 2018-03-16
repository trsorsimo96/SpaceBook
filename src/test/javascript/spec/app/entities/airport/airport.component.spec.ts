/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SpaceBookTestModule } from '../../../test.module';
import { AirportComponent } from '../../../../../../main/webapp/app/entities/airport/airport.component';
import { AirportService } from '../../../../../../main/webapp/app/entities/airport/airport.service';
import { Airport } from '../../../../../../main/webapp/app/entities/airport/airport.model';

describe('Component Tests', () => {

    describe('Airport Management Component', () => {
        let comp: AirportComponent;
        let fixture: ComponentFixture<AirportComponent>;
        let service: AirportService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpaceBookTestModule],
                declarations: [AirportComponent],
                providers: [
                    AirportService
                ]
            })
            .overrideTemplate(AirportComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AirportComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AirportService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Airport(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.airports[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
