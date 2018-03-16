/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SpaceBookTestModule } from '../../../test.module';
import { GroupAirlineAllianceDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/group-airline-alliance/group-airline-alliance-delete-dialog.component';
import { GroupAirlineAllianceService } from '../../../../../../main/webapp/app/entities/group-airline-alliance/group-airline-alliance.service';

describe('Component Tests', () => {

    describe('GroupAirlineAlliance Management Delete Component', () => {
        let comp: GroupAirlineAllianceDeleteDialogComponent;
        let fixture: ComponentFixture<GroupAirlineAllianceDeleteDialogComponent>;
        let service: GroupAirlineAllianceService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpaceBookTestModule],
                declarations: [GroupAirlineAllianceDeleteDialogComponent],
                providers: [
                    GroupAirlineAllianceService
                ]
            })
            .overrideTemplate(GroupAirlineAllianceDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GroupAirlineAllianceDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GroupAirlineAllianceService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
