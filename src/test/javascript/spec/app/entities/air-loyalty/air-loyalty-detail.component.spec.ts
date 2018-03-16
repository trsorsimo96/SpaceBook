/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SpaceBookTestModule } from '../../../test.module';
import { AirLoyaltyDetailComponent } from '../../../../../../main/webapp/app/entities/air-loyalty/air-loyalty-detail.component';
import { AirLoyaltyService } from '../../../../../../main/webapp/app/entities/air-loyalty/air-loyalty.service';
import { AirLoyalty } from '../../../../../../main/webapp/app/entities/air-loyalty/air-loyalty.model';

describe('Component Tests', () => {

    describe('AirLoyalty Management Detail Component', () => {
        let comp: AirLoyaltyDetailComponent;
        let fixture: ComponentFixture<AirLoyaltyDetailComponent>;
        let service: AirLoyaltyService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpaceBookTestModule],
                declarations: [AirLoyaltyDetailComponent],
                providers: [
                    AirLoyaltyService
                ]
            })
            .overrideTemplate(AirLoyaltyDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AirLoyaltyDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AirLoyaltyService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new AirLoyalty(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.airLoyalty).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
