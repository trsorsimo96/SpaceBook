/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SpaceBookTestModule } from '../../../test.module';
import { CurrencyComponent } from '../../../../../../main/webapp/app/entities/currency/currency.component';
import { CurrencyService } from '../../../../../../main/webapp/app/entities/currency/currency.service';
import { Currency } from '../../../../../../main/webapp/app/entities/currency/currency.model';

describe('Component Tests', () => {

    describe('Currency Management Component', () => {
        let comp: CurrencyComponent;
        let fixture: ComponentFixture<CurrencyComponent>;
        let service: CurrencyService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpaceBookTestModule],
                declarations: [CurrencyComponent],
                providers: [
                    CurrencyService
                ]
            })
            .overrideTemplate(CurrencyComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CurrencyComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CurrencyService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Currency(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.currencies[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
