/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SpaceBookTestModule } from '../../../test.module';
import { GroupAirlineAllianceDialogComponent } from '../../../../../../main/webapp/app/entities/group-airline-alliance/group-airline-alliance-dialog.component';
import { GroupAirlineAllianceService } from '../../../../../../main/webapp/app/entities/group-airline-alliance/group-airline-alliance.service';
import { GroupAirlineAlliance } from '../../../../../../main/webapp/app/entities/group-airline-alliance/group-airline-alliance.model';

describe('Component Tests', () => {

    describe('GroupAirlineAlliance Management Dialog Component', () => {
        let comp: GroupAirlineAllianceDialogComponent;
        let fixture: ComponentFixture<GroupAirlineAllianceDialogComponent>;
        let service: GroupAirlineAllianceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpaceBookTestModule],
                declarations: [GroupAirlineAllianceDialogComponent],
                providers: [
                    GroupAirlineAllianceService
                ]
            })
            .overrideTemplate(GroupAirlineAllianceDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GroupAirlineAllianceDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GroupAirlineAllianceService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new GroupAirlineAlliance(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.groupAirlineAlliance = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'groupAirlineAllianceListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new GroupAirlineAlliance();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.groupAirlineAlliance = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'groupAirlineAllianceListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
