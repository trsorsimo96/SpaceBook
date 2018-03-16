/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { SpaceBookTestModule } from '../../../test.module';
import { SegmentComponent } from '../../../../../../main/webapp/app/entities/segment/segment.component';
import { SegmentService } from '../../../../../../main/webapp/app/entities/segment/segment.service';
import { Segment } from '../../../../../../main/webapp/app/entities/segment/segment.model';

describe('Component Tests', () => {

    describe('Segment Management Component', () => {
        let comp: SegmentComponent;
        let fixture: ComponentFixture<SegmentComponent>;
        let service: SegmentService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [SpaceBookTestModule],
                declarations: [SegmentComponent],
                providers: [
                    SegmentService
                ]
            })
            .overrideTemplate(SegmentComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SegmentComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SegmentService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Segment(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.segments[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
