/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SpaceBookTestModule } from '../../../test.module';
import { ConfigFeesComponent } from '../../../../../../main/webapp/app/entities/config-fees/config-fees.component';
import { ConfigFeesService } from '../../../../../../main/webapp/app/entities/config-fees/config-fees.service';
import { ConfigFees } from '../../../../../../main/webapp/app/entities/config-fees/config-fees.model';

describe('Component Tests', () => {

    describe('ConfigFees Management Component', () => {
        let comp: ConfigFeesComponent;
        let fixture: ComponentFixture<ConfigFeesComponent>;
        let service: ConfigFeesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpaceBookTestModule],
                declarations: [ConfigFeesComponent],
                providers: [
                    ConfigFeesService
                ]
            })
            .overrideTemplate(ConfigFeesComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ConfigFeesComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConfigFeesService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ConfigFees(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.configFees[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
