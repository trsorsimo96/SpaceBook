/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SpaceBookTestModule } from '../../../test.module';
import { TownDetailComponent } from '../../../../../../main/webapp/app/entities/town/town-detail.component';
import { TownService } from '../../../../../../main/webapp/app/entities/town/town.service';
import { Town } from '../../../../../../main/webapp/app/entities/town/town.model';

describe('Component Tests', () => {

    describe('Town Management Detail Component', () => {
        let comp: TownDetailComponent;
        let fixture: ComponentFixture<TownDetailComponent>;
        let service: TownService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpaceBookTestModule],
                declarations: [TownDetailComponent],
                providers: [
                    TownService
                ]
            })
            .overrideTemplate(TownDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TownDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TownService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Town(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.town).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
