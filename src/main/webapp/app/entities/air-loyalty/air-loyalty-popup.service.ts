import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { AirLoyalty } from './air-loyalty.model';
import { AirLoyaltyService } from './air-loyalty.service';

@Injectable()
export class AirLoyaltyPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private airLoyaltyService: AirLoyaltyService

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
                this.airLoyaltyService.find(id)
                    .subscribe((airLoyaltyResponse: HttpResponse<AirLoyalty>) => {
                        const airLoyalty: AirLoyalty = airLoyaltyResponse.body;
                        this.ngbModalRef = this.airLoyaltyModalRef(component, airLoyalty);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.airLoyaltyModalRef(component, new AirLoyalty());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    airLoyaltyModalRef(component: Component, airLoyalty: AirLoyalty): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.airLoyalty = airLoyalty;
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
