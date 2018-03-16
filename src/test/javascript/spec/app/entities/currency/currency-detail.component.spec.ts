/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SpaceBookTestModule } from '../../../test.module';
import { CurrencyDetailComponent } from '../../../../../../main/webapp/app/entities/currency/currency-detail.component';
import { CurrencyService } from '../../../../../../main/webapp/app/entities/currency/currency.service';
import { Currency } from '../../../../../../main/webapp/app/entities/currency/currency.model';

describe('Component Tests', () => {

    describe('Currency Management Detail Component', () => {
        let comp: CurrencyDetailComponent;
        let fixture: ComponentFixture<CurrencyDetailComponent>;
        let service: CurrencyService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpaceBookTestModule],
                declarations: [CurrencyDetailComponent],
                providers: [
                    CurrencyService
                ]
            })
            .overrideTemplate(CurrencyDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CurrencyDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CurrencyService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Currency(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.currency).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
