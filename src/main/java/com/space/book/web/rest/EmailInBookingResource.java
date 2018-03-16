package com.space.book.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.space.book.domain.EmailInBooking;

import com.space.book.repository.EmailInBookingRepository;
import com.space.book.repository.search.EmailInBookingSearchRepository;
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
 * REST controller for managing EmailInBooking.
 */
@RestController
@RequestMapping("/api")
public class EmailInBookingResource {

    private final Logger log = LoggerFactory.getLogger(EmailInBookingResource.class);

    private static final String ENTITY_NAME = "emailInBooking";

    private final EmailInBookingRepository emailInBookingRepository;

    private final EmailInBookingSearchRepository emailInBookingSearchRepository;

    public EmailInBookingResource(EmailInBookingRepository emailInBookingRepository, EmailInBookingSearchRepository emailInBookingSearchRepository) {
        this.emailInBookingRepository = emailInBookingRepository;
        this.emailInBookingSearchRepository = emailInBookingSearchRepository;
    }

    /**
     * POST  /email-in-bookings : Create a new emailInBooking.
     *
     * @param emailInBooking the emailInBooking to create
     * @return the ResponseEntity with status 201 (Created) and with body the new emailInBooking, or with status 400 (Bad Request) if the emailInBooking has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/email-in-bookings")
    @Timed
    public ResponseEntity<EmailInBooking> createEmailInBooking(@Valid @RequestBody EmailInBooking emailInBooking) throws URISyntaxException {
        log.debug("REST request to save EmailInBooking : {}", emailInBooking);
        if (emailInBooking.getId() != null) {
            throw new BadRequestAlertException("A new emailInBooking cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EmailInBooking result = emailInBookingRepository.save(emailInBooking);
        emailInBookingSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/email-in-bookings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /email-in-bookings : Updates an existing emailInBooking.
     *
     * @param emailInBooking the emailInBooking to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated emailInBooking,
     * or with status 400 (Bad Request) if the emailInBooking is not valid,
     * or with status 500 (Internal Server Error) if the emailInBooking couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/email-in-bookings")
    @Timed
    public ResponseEntity<EmailInBooking> updateEmailInBooking(@Valid @RequestBody EmailInBooking emailInBooking) throws URISyntaxException {
        log.debug("REST request to update EmailInBooking : {}", emailInBooking);
        if (emailInBooking.getId() == null) {
            return createEmailInBooking(emailInBooking);
        }
        EmailInBooking result = emailInBookingRepository.save(emailInBooking);
        emailInBookingSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, emailInBooking.getId().toString()))
            .body(result);
    }

    /**
     * GET  /email-in-bookings : get all the emailInBookings.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of emailInBookings in body
     */
    @GetMapping("/email-in-bookings")
    @Timed
    public List<EmailInBooking> getAllEmailInBookings() {
        log.debug("REST request to get all EmailInBookings");
        return emailInBookingRepository.findAll();
        }

    /**
     * GET  /email-in-bookings/:id : get the "id" emailInBooking.
     *
     * @param id the id of the emailInBooking to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the emailInBooking, or with status 404 (Not Found)
     */
    @GetMapping("/email-in-bookings/{id}")
    @Timed
    public ResponseEntity<EmailInBooking> getEmailInBooking(@PathVariable Long id) {
        log.debug("REST request to get EmailInBooking : {}", id);
        EmailInBooking emailInBooking = emailInBookingRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(emailInBooking));
    }

    /**
     * DELETE  /email-in-bookings/:id : delete the "id" emailInBooking.
     *
     * @param id the id of the emailInBooking to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/email-in-bookings/{id}")
    @Timed
    public ResponseEntity<Void> deleteEmailInBooking(@PathVariable Long id) {
        log.debug("REST request to delete EmailInBooking : {}", id);
        emailInBookingRepository.delete(id);
        emailInBookingSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/email-in-bookings?query=:query : search for the emailInBooking corresponding
     * to the query.
     *
     * @param query the query of the emailInBooking search
     * @return the result of the search
     */
    @GetMapping("/_search/email-in-bookings")
    @Timed
    public List<EmailInBooking> searchEmailInBookings(@RequestParam String query) {
        log.debug("REST request to search EmailInBookings for query {}", query);
        return StreamSupport
            .stream(emailInBookingSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
