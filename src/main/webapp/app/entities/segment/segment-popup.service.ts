import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Segment } from './segment.model';
import { SegmentService } from './segment.service';

@Injectable()
export class SegmentPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private segmentService: SegmentService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.segmentService.find(id)
                    .subscribe((segmentResponse: HttpResponse<Segment>) => {
                        const segment: Segment = segmentResponse.body;
                        if (segment.date) {
                            segment.date = {
                                year: segment.date.getFullYear(),
                                month: segment.date.getMonth() + 1,
                                day: segment.date.getDate()
                            };
                        }
                        this.ngbModalRef = this.segmentModalRef(component, segment);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.segmentModalRef(component, new Segment());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    segmentModalRef(component: Component, segment: Segment): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.segment = segment;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
