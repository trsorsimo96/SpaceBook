import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ConfigFees } from './config-fees.model';
import { ConfigFeesPopupService } from './config-fees-popup.service';
import { ConfigFeesService } from './config-fees.service';

@Component({
    selector: 'jhi-config-fees-delete-dialog',
    templateUrl: './config-fees-delete-dialog.component.html'
})
export class ConfigFeesDeleteDialogComponent {

    configFees: ConfigFees;

    constructor(
        private configFeesService: ConfigFeesService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.configFeesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'configFeesListModification',
                content: 'Deleted an configFees'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-config-fees-delete-popup',
    template: ''
})
export class ConfigFeesDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private configFeesPopupService: ConfigFeesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.configFeesPopupService
                .open(ConfigFeesDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
