import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Passenger } from './passenger.model';
import { PassengerService } from './passenger.service';

@Injectable()
export class PassengerPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private passengerService: PassengerService

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
                this.passengerService.find(id)
                    .subscribe((passengerResponse: HttpResponse<Passenger>) => {
                        const passenger: Passenger = passengerResponse.body;
                        if (passenger.birthday) {
                            passenger.birthday = {
                                year: passenger.birthday.getFullYear(),
                                month: passenger.birthday.getMonth() + 1,
                                day: passenger.birthday.getDate()
                            };
                        }
                        this.ngbModalRef = this.passengerModalRef(component, passenger);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.passengerModalRef(component, new Passenger());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    passengerModalRef(component: Component, passenger: Passenger): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.passenger = passenger;
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
