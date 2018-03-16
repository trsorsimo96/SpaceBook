import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Town } from './town.model';
import { TownPopupService } from './town-popup.service';
import { TownService } from './town.service';

@Component({
    selector: 'jhi-town-delete-dialog',
    templateUrl: './town-delete-dialog.component.html'
})
export class TownDeleteDialogComponent {

    town: Town;

    constructor(
        private townService: TownService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.townService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'townListModification',
                content: 'Deleted an town'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-town-delete-popup',
    template: ''
})
export class TownDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private townPopupService: TownPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.townPopupService
                .open(TownDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
