import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Agent } from './agent.model';
import { AgentPopupService } from './agent-popup.service';
import { AgentService } from './agent.service';
import { Agency, AgencyService } from '../agency';

@Component({
    selector: 'jhi-agent-dialog',
    templateUrl: './agent-dialog.component.html'
})
export class AgentDialogComponent implements OnInit {

    agent: Agent;
    isSaving: boolean;

    agencies: Agency[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private agentService: AgentService,
        private agencyService: AgencyService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.agencyService.query()
            .subscribe((res: HttpResponse<Agency[]>) => { this.agencies = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.agent.id !== undefined) {
            this.subscribeToSaveResponse(
                this.agentService.update(this.agent));
        } else {
            this.subscribeToSaveResponse(
                this.agentService.create(this.agent));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Agent>>) {
        result.subscribe((res: HttpResponse<Agent>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Agent) {
        this.eventManager.broadcast({ name: 'agentListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackAgencyById(index: number, item: Agency) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-agent-popup',
    template: ''
})
export class AgentPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private agentPopupService: AgentPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.agentPopupService
                    .open(AgentDialogComponent as Component, params['id']);
            } else {
                this.agentPopupService
                    .open(AgentDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
