import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { PhoneInBooking } from './phone-in-booking.model';
import { PhoneInBookingService } from './phone-in-booking.service';

@Injectable()
export class PhoneInBookingPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private phoneInBookingService: PhoneInBookingService

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
                this.phoneInBookingService.find(id)
                    .subscribe((phoneInBookingResponse: HttpResponse<PhoneInBooking>) => {
                        const phoneInBooking: PhoneInBooking = phoneInBookingResponse.body;
                        this.ngbModalRef = this.phoneInBookingModalRef(component, phoneInBooking);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.phoneInBookingModalRef(component, new PhoneInBooking());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    phoneInBookingModalRef(component: Component, phoneInBooking: PhoneInBooking): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.phoneInBooking = phoneInBooking;
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
