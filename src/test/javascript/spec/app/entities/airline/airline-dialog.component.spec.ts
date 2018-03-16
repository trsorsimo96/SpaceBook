/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SpaceBookTestModule } from '../../../test.module';
import { AirlineDialogComponent } from '../../../../../../main/webapp/app/entities/airline/airline-dialog.component';
import { AirlineService } from '../../../../../../main/webapp/app/entities/airline/airline.service';
import { Airline } from '../../../../../../main/webapp/app/entities/airline/airline.model';
import { GroupAirlineAllianceService } from '../../../../../../main/webapp/app/entities/group-airline-alliance';
import { SegmentService } from '../../../../../../main/webapp/app/entities/segment';
import { ConfigFeesService } from '../../../../../../main/webapp/app/entities/config-fees';

describe('Component Tests', () => {

    describe('Airline Management Dialog Component', () => {
        let comp: AirlineDialogComponent;
        let fixture: ComponentFixture<AirlineDialogComponent>;
        let service: AirlineService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpaceBookTestModule],
                declarations: [AirlineDialogComponent],
                providers: [
                    GroupAirlineAllianceService,
                    SegmentService,
                    ConfigFeesService,
                    AirlineService
                ]
            })
            .overrideTemplate(AirlineDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AirlineDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AirlineService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Airline(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.airline = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'airlineListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Airline();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.airline = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'airlineListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
