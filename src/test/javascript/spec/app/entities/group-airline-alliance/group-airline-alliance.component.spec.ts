/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SpaceBookTestModule } from '../../../test.module';
import { GroupAirlineAllianceComponent } from '../../../../../../main/webapp/app/entities/group-airline-alliance/group-airline-alliance.component';
import { GroupAirlineAllianceService } from '../../../../../../main/webapp/app/entities/group-airline-alliance/group-airline-alliance.service';
import { GroupAirlineAlliance } from '../../../../../../main/webapp/app/entities/group-airline-alliance/group-airline-alliance.model';

describe('Component Tests', () => {

    describe('GroupAirlineAlliance Management Component', () => {
        let comp: GroupAirlineAllianceComponent;
        let fixture: ComponentFixture<GroupAirlineAllianceComponent>;
        let service: GroupAirlineAllianceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpaceBookTestModule],
                declarations: [GroupAirlineAllianceComponent],
                providers: [
                    GroupAirlineAllianceService
                ]
            })
            .overrideTemplate(GroupAirlineAllianceComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GroupAirlineAllianceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GroupAirlineAllianceService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new GroupAirlineAlliance(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.groupAirlineAlliances[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
