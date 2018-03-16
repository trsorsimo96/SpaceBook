import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { AddressInBooking } from './address-in-booking.model';
import { AddressInBookingService } from './address-in-booking.service';

@Injectable()
export class AddressInBookingPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private addressInBookingService: AddressInBookingService

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
                this.addressInBookingService.find(id)
                    .subscribe((addressInBookingResponse: HttpResponse<AddressInBooking>) => {
                        const addressInBooking: AddressInBooking = addressInBookingResponse.body;
                        this.ngbModalRef = this.addressInBookingModalRef(component, addressInBooking);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.addressInBookingModalRef(component, new AddressInBooking());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    addressInBookingModalRef(component: Component, addressInBooking: AddressInBooking): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.addressInBooking = addressInBooking;
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
