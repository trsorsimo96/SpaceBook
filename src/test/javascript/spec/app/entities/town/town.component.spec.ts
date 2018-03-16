/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SpaceBookTestModule } from '../../../test.module';
import { TownComponent } from '../../../../../../main/webapp/app/entities/town/town.component';
import { TownService } from '../../../../../../main/webapp/app/entities/town/town.service';
import { Town } from '../../../../../../main/webapp/app/entities/town/town.model';

describe('Component Tests', () => {

    describe('Town Management Component', () => {
        let comp: TownComponent;
        let fixture: ComponentFixture<TownComponent>;
        let service: TownService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpaceBookTestModule],
                declarations: [TownComponent],
                providers: [
                    TownService
                ]
            })
            .overrideTemplate(TownComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TownComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TownService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Town(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.towns[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
