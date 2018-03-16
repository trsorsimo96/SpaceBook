import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { EmailInBooking } from './email-in-booking.model';
import { EmailInBookingService } from './email-in-booking.service';

@Injectable()
export class EmailInBookingPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private emailInBookingService: EmailInBookingService

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
                this.emailInBookingService.find(id)
                    .subscribe((emailInBookingResponse: HttpResponse<EmailInBooking>) => {
                        const emailInBooking: EmailInBooking = emailInBookingResponse.body;
                        this.ngbModalRef = this.emailInBookingModalRef(component, emailInBooking);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.emailInBookingModalRef(component, new EmailInBooking());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    emailInBookingModalRef(component: Component, emailInBooking: EmailInBooking): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.emailInBooking = emailInBooking;
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
