/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SpaceBookTestModule } from '../../../test.module';
import { AirportDetailComponent } from '../../../../../../main/webapp/app/entities/airport/airport-detail.component';
import { AirportService } from '../../../../../../main/webapp/app/entities/airport/airport.service';
import { Airport } from '../../../../../../main/webapp/app/entities/airport/airport.model';

describe('Component Tests', () => {

    describe('Airport Management Detail Component', () => {
        let comp: AirportDetailComponent;
        let fixture: ComponentFixture<AirportDetailComponent>;
        let service: AirportService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpaceBookTestModule],
                declarations: [AirportDetailComponent],
                providers: [
                    AirportService
                ]
            })
            .overrideTemplate(AirportDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AirportDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AirportService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Airport(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.airport).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
