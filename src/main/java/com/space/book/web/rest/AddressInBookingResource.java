package com.space.book.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.space.book.domain.AddressInBooking;

import com.space.book.repository.AddressInBookingRepository;
import com.space.book.repository.search.AddressInBookingSearchRepository;
import com.space.book.web.rest.errors.BadRequestAlertException;
import com.space.book.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing AddressInBooking.
 */
@RestController
@RequestMapping("/api")
public class AddressInBookingResource {

    private final Logger log = LoggerFactory.getLogger(AddressInBookingResource.class);

    private static final String ENTITY_NAME = "addressInBooking";

    private final AddressInBookingRepository addressInBookingRepository;

    private final AddressInBookingSearchRepository addressInBookingSearchRepository;

    public AddressInBookingResource(AddressInBookingRepository addressInBookingRepository, AddressInBookingSearchRepository addressInBookingSearchRepository) {
        this.addressInBookingRepository = addressInBookingRepository;
        this.addressInBookingSearchRepository = addressInBookingSearchRepository;
    }

    /**
     * POST  /address-in-bookings : Create a new addressInBooking.
     *
     * @param addressInBooking the addressInBooking to create
     * @return the ResponseEntity with status 201 (Created) and with body the new addressInBooking, or with status 400 (Bad Request) if the addressInBooking has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/address-in-bookings")
    @Timed
    public ResponseEntity<AddressInBooking> createAddressInBooking(@Valid @RequestBody AddressInBooking addressInBooking) throws URISyntaxException {
        log.debug("REST request to save AddressInBooking : {}", addressInBooking);
        if (addressInBooking.getId() != null) {
            throw new BadRequestAlertException("A new addressInBooking cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AddressInBooking result = addressInBookingRepository.save(addressInBooking);
        addressInBookingSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/address-in-bookings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /address-in-bookings : Updates an existing addressInBooking.
     *
     * @param addressInBooking the addressInBooking to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated addressInBooking,
     * or with status 400 (Bad Request) if the addressInBooking is not valid,
     * or with status 500 (Internal Server Error) if the addressInBooking couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/address-in-bookings")
    @Timed
    public ResponseEntity<AddressInBooking> updateAddressInBooking(@Valid @RequestBody AddressInBooking addressInBooking) throws URISyntaxException {
        log.debug("REST request to update AddressInBooking : {}", addressInBooking);
        if (addressInBooking.getId() == null) {
            return createAddressInBooking(addressInBooking);
        }
        AddressInBooking result = addressInBookingRepository.save(addressInBooking);
        addressInBookingSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, addressInBooking.getId().toString()))
            .body(result);
    }

    /**
     * GET  /address-in-bookings : get all the addressInBookings.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of addressInBookings in body
     */
    @GetMapping("/address-in-bookings")
    @Timed
    public List<AddressInBooking> getAllAddressInBookings() {
        log.debug("REST request to get all AddressInBookings");
        return addressInBookingRepository.findAll();
        }

    /**
     * GET  /address-in-bookings/:id : get the "id" addressInBooking.
     *
     * @param id the id of the addressInBooking to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the addressInBooking, or with status 404 (Not Found)
     */
    @GetMapping("/address-in-bookings/{id}")
    @Timed
    public ResponseEntity<AddressInBooking> getAddressInBooking(@PathVariable Long id) {
        log.debug("REST request to get AddressInBooking : {}", id);
        AddressInBooking addressInBooking = addressInBookingRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(addressInBooking));
    }

    /**
     * DELETE  /address-in-bookings/:id : delete the "id" addressInBooking.
     *
     * @param id the id of the addressInBooking to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/address-in-bookings/{id}")
    @Timed
    public ResponseEntity<Void> deleteAddressInBooking(@PathVariable Long id) {
        log.debug("REST request to delete AddressInBooking : {}", id);
        addressInBookingRepository.delete(id);
        addressInBookingSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/address-in-bookings?query=:query : search for the addressInBooking corresponding
     * to the query.
     *
     * @param query the query of the addressInBooking search
     * @return the result of the search
     */
    @GetMapping("/_search/address-in-bookings")
    @Timed
    public List<AddressInBooking> searchAddressInBookings(@RequestParam String query) {
        log.debug("REST request to search AddressInBookings for query {}", query);
        return StreamSupport
            .stream(addressInBookingSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
