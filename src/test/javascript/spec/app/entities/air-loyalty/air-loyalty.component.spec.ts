/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SpaceBookTestModule } from '../../../test.module';
import { AirLoyaltyComponent } from '../../../../../../main/webapp/app/entities/air-loyalty/air-loyalty.component';
import { AirLoyaltyService } from '../../../../../../main/webapp/app/entities/air-loyalty/air-loyalty.service';
import { AirLoyalty } from '../../../../../../main/webapp/app/entities/air-loyalty/air-loyalty.model';

describe('Component Tests', () => {

    describe('AirLoyalty Management Component', () => {
        let comp: AirLoyaltyComponent;
        let fixture: ComponentFixture<AirLoyaltyComponent>;
        let service: AirLoyaltyService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpaceBookTestModule],
                declarations: [AirLoyaltyComponent],
                providers: [
                    AirLoyaltyService
                ]
            })
            .overrideTemplate(AirLoyaltyComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AirLoyaltyComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AirLoyaltyService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new AirLoyalty(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.airLoyalties[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
