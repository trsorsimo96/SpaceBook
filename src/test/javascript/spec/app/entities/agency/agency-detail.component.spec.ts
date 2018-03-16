/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SpaceBookTestModule } from '../../../test.module';
import { AgencyDetailComponent } from '../../../../../../main/webapp/app/entities/agency/agency-detail.component';
import { AgencyService } from '../../../../../../main/webapp/app/entities/agency/agency.service';
import { Agency } from '../../../../../../main/webapp/app/entities/agency/agency.model';

describe('Component Tests', () => {

    describe('Agency Management Detail Component', () => {
        let comp: AgencyDetailComponent;
        let fixture: ComponentFixture<AgencyDetailComponent>;
        let service: AgencyService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpaceBookTestModule],
                declarations: [AgencyDetailComponent],
                providers: [
                    AgencyService
                ]
            })
            .overrideTemplate(AgencyDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AgencyDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AgencyService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Agency(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.agency).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
