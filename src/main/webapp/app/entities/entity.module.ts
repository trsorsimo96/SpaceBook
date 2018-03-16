import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SpaceBookAirlineModule } from './airline/airline.module';
import { SpaceBookAgencyModule } from './agency/agency.module';
import { SpaceBookAgentModule } from './agent/agent.module';
import { SpaceBookCorporateModule } from './corporate/corporate.module';
import { SpaceBookPassengerModule } from './passenger/passenger.module';
import { SpaceBookAirLoyaltyModule } from './air-loyalty/air-loyalty.module';
import { SpaceBookGroupAirlineAllianceModule } from './group-airline-alliance/group-airline-alliance.module';
import { SpaceBookCountryModule } from './country/country.module';
import { SpaceBookCurrencyModule } from './currency/currency.module';
import { SpaceBookAirportModule } from './airport/airport.module';
import { SpaceBookTownModule } from './town/town.module';
import { SpaceBookSegmentModule } from './segment/segment.module';
import { SpaceBookPhoneInBookingModule } from './phone-in-booking/phone-in-booking.module';
import { SpaceBookEmailInBookingModule } from './email-in-booking/email-in-booking.module';
import { SpaceBookAddressInBookingModule } from './address-in-booking/address-in-booking.module';
import { SpaceBookConfigFeesModule } from './config-fees/config-fees.module';
import { SpaceBookBookingModule } from './booking/booking.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        SpaceBookAirlineModule,
        SpaceBookAgencyModule,
        SpaceBookAgentModule,
        SpaceBookCorporateModule,
        SpaceBookPassengerModule,
        SpaceBookAirLoyaltyModule,
        SpaceBookGroupAirlineAllianceModule,
        SpaceBookCountryModule,
        SpaceBookCurrencyModule,
        SpaceBookAirportModule,
        SpaceBookTownModule,
        SpaceBookSegmentModule,
        SpaceBookPhoneInBookingModule,
        SpaceBookEmailInBookingModule,
        SpaceBookAddressInBookingModule,
        SpaceBookConfigFeesModule,
        SpaceBookBookingModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpaceBookEntityModule {}
