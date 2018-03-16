package com.space.book.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.space.book.domain.PhoneInBooking;

import com.space.book.repository.PhoneInBookingRepository;
import com.space.book.repository.search.PhoneInBookingSearchRepository;
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
 * REST controller for managing PhoneInBooking.
 */
@RestController
@RequestMapping("/api")
public class PhoneInBookingResource {

    private final Logger log = LoggerFactory.getLogger(PhoneInBookingResource.class);

    private static final String ENTITY_NAME = "phoneInBooking";

    private final PhoneInBookingRepository phoneInBookingRepository;

    private final PhoneInBookingSearchRepository phoneInBookingSearchRepository;

    public PhoneInBookingResource(PhoneInBookingRepository phoneInBookingRepository, PhoneInBookingSearchRepository phoneInBookingSearchRepository) {
        this.phoneInBookingRepository = phoneInBookingRepository;
        this.phoneInBookingSearchRepository = phoneInBookingSearchRepository;
    }

    /**
     * POST  /phone-in-bookings : Create a new phoneInBooking.
     *
     * @param phoneInBooking the phoneInBooking to create
     * @return the ResponseEntity with status 201 (Created) and with body the new phoneInBooking, or with status 400 (Bad Request) if the phoneInBooking has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/phone-in-bookings")
    @Timed
    public ResponseEntity<PhoneInBooking> createPhoneInBooking(@Valid @RequestBody PhoneInBooking phoneInBooking) throws URISyntaxException {
        log.debug("REST request to save PhoneInBooking : {}", phoneInBooking);
        if (phoneInBooking.getId() != null) {
            throw new BadRequestAlertException("A new phoneInBooking cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PhoneInBooking result = phoneInBookingRepository.save(phoneInBooking);
        phoneInBookingSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/phone-in-bookings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /phone-in-bookings : Updates an existing phoneInBooking.
     *
     * @param phoneInBooking the phoneInBooking to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated phoneInBooking,
     * or with status 400 (Bad Request) if the phoneInBooking is not valid,
     * or with status 500 (Internal Server Error) if the phoneInBooking couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/phone-in-bookings")
    @Timed
    public ResponseEntity<PhoneInBooking> updatePhoneInBooking(@Valid @RequestBody PhoneInBooking phoneInBooking) throws URISyntaxException {
        log.debug("REST request to update PhoneInBooking : {}", phoneInBooking);
        if (phoneInBooking.getId() == null) {
            return createPhoneInBooking(phoneInBooking);
        }
        PhoneInBooking result = phoneInBookingRepository.save(phoneInBooking);
        phoneInBookingSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, phoneInBooking.getId().toString()))
            .body(result);
    }

    /**
     * GET  /phone-in-bookings : get all the phoneInBookings.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of phoneInBookings in body
     */
    @GetMapping("/phone-in-bookings")
    @Timed
    public List<PhoneInBooking> getAllPhoneInBookings() {
        log.debug("REST request to get all PhoneInBookings");
        return phoneInBookingRepository.findAll();
        }

    /**
     * GET  /phone-in-bookings/:id : get the "id" phoneInBooking.
     *
     * @param id the id of the phoneInBooking to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the phoneInBooking, or with status 404 (Not Found)
     */
    @GetMapping("/phone-in-bookings/{id}")
    @Timed
    public ResponseEntity<PhoneInBooking> getPhoneInBooking(@PathVariable Long id) {
        log.debug("REST request to get PhoneInBooking : {}", id);
        PhoneInBooking phoneInBooking = phoneInBookingRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(phoneInBooking));
    }

    /**
     * DELETE  /phone-in-bookings/:id : delete the "id" phoneInBooking.
     *
     * @param id the id of the phoneInBooking to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/phone-in-bookings/{id}")
    @Timed
    public ResponseEntity<Void> deletePhoneInBooking(@PathVariable Long id) {
        log.debug("REST request to delete PhoneInBooking : {}", id);
        phoneInBookingRepository.delete(id);
        phoneInBookingSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/phone-in-bookings?query=:query : search for the phoneInBooking corresponding
     * to the query.
     *
     * @param query the query of the phoneInBooking search
     * @return the result of the search
     */
    @GetMapping("/_search/phone-in-bookings")
    @Timed
    public List<PhoneInBooking> searchPhoneInBookings(@RequestParam String query) {
        log.debug("REST request to search PhoneInBookings for query {}", query);
        return StreamSupport
            .stream(phoneInBookingSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
