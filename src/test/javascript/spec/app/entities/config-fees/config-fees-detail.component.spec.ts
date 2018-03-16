/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SpaceBookTestModule } from '../../../test.module';
import { ConfigFeesDetailComponent } from '../../../../../../main/webapp/app/entities/config-fees/config-fees-detail.component';
import { ConfigFeesService } from '../../../../../../main/webapp/app/entities/config-fees/config-fees.service';
import { ConfigFees } from '../../../../../../main/webapp/app/entities/config-fees/config-fees.model';

describe('Component Tests', () => {

    describe('ConfigFees Management Detail Component', () => {
        let comp: ConfigFeesDetailComponent;
        let fixture: ComponentFixture<ConfigFeesDetailComponent>;
        let service: ConfigFeesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpaceBookTestModule],
                declarations: [ConfigFeesDetailComponent],
                providers: [
                    ConfigFeesService
                ]
            })
            .overrideTemplate(ConfigFeesDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ConfigFeesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConfigFeesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ConfigFees(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.configFees).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
