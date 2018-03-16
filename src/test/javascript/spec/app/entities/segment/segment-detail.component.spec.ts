/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SpaceBookTestModule } from '../../../test.module';
import { SegmentDetailComponent } from '../../../../../../main/webapp/app/entities/segment/segment-detail.component';
import { SegmentService } from '../../../../../../main/webapp/app/entities/segment/segment.service';
import { Segment } from '../../../../../../main/webapp/app/entities/segment/segment.model';

describe('Component Tests', () => {

    describe('Segment Management Detail Component', () => {
        let comp: SegmentDetailComponent;
        let fixture: ComponentFixture<SegmentDetailComponent>;
        let service: SegmentService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpaceBookTestModule],
                declarations: [SegmentDetailComponent],
                providers: [
                    SegmentService
                ]
            })
            .overrideTemplate(SegmentDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SegmentDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SegmentService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Segment(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.segment).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
