/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { SpaceBookTestModule } from '../../../test.module';
import { AirLoyaltyDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/air-loyalty/air-loyalty-delete-dialog.component';
import { AirLoyaltyService } from '../../../../../../main/webapp/app/entities/air-loyalty/air-loyalty.service';

describe('Component Tests', () => {

    describe('AirLoyalty Management Delete Component', () => {
        let comp: AirLoyaltyDeleteDialogComponent;
        let fixture: ComponentFixture<AirLoyaltyDeleteDialogComponent>;
        let service: AirLoyaltyService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpaceBookTestModule],
                declarations: [AirLoyaltyDeleteDialogComponent],
                providers: [
                    AirLoyaltyService
                ]
            })
            .overrideTemplate(AirLoyaltyDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AirLoyaltyDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AirLoyaltyService);
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
