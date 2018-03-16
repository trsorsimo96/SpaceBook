package com.space.book.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.space.book.domain.Airline;

import com.space.book.repository.AirlineRepository;
import com.space.book.repository.search.AirlineSearchRepository;
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
 * REST controller for managing Airline.
 */
@RestController
@RequestMapping("/api")
public class AirlineResource {

    private final Logger log = LoggerFactory.getLogger(AirlineResource.class);

    private static final String ENTITY_NAME = "airline";

    private final AirlineRepository airlineRepository;

    private final AirlineSearchRepository airlineSearchRepository;

    public AirlineResource(AirlineRepository airlineRepository, AirlineSearchRepository airlineSearchRepository) {
        this.airlineRepository = airlineRepository;
        this.airlineSearchRepository = airlineSearchRepository;
    }

    /**
     * POST  /airlines : Create a new airline.
     *
     * @param airline the airline to create
     * @return the ResponseEntity with status 201 (Created) and with body the new airline, or with status 400 (Bad Request) if the airline has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/airlines")
    @Timed
    public ResponseEntity<Airline> createAirline(@Valid @RequestBody Airline airline) throws URISyntaxException {
        log.debug("REST request to save Airline : {}", airline);
        if (airline.getId() != null) {
            throw new BadRequestAlertException("A new airline cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Airline result = airlineRepository.save(airline);
        airlineSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/airlines/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /airlines : Updates an existing airline.
     *
     * @param airline the airline to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated airline,
     * or with status 400 (Bad Request) if the airline is not valid,
     * or with status 500 (Internal Server Error) if the airline couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/airlines")
    @Timed
    public ResponseEntity<Airline> updateAirline(@Valid @RequestBody Airline airline) throws URISyntaxException {
        log.debug("REST request to update Airline : {}", airline);
        if (airline.getId() == null) {
            return createAirline(airline);
        }
        Airline result = airlineRepository.save(airline);
        airlineSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, airline.getId().toString()))
            .body(result);
    }

    /**
     * GET  /airlines : get all the airlines.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of airlines in body
     */
    @GetMapping("/airlines")
    @Timed
    public List<Airline> getAllAirlines() {
        log.debug("REST request to get all Airlines");
        return airlineRepository.findAll();
        }

    /**
     * GET  /airlines/:id : get the "id" airline.
     *
     * @param id the id of the airline to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the airline, or with status 404 (Not Found)
     */
    @GetMapping("/airlines/{id}")
    @Timed
    public ResponseEntity<Airline> getAirline(@PathVariable Long id) {
        log.debug("REST request to get Airline : {}", id);
        Airline airline = airlineRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(airline));
    }

    /**
     * DELETE  /airlines/:id : delete the "id" airline.
     *
     * @param id the id of the airline to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/airlines/{id}")
    @Timed
    public ResponseEntity<Void> deleteAirline(@PathVariable Long id) {
        log.debug("REST request to delete Airline : {}", id);
        airlineRepository.delete(id);
        airlineSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/airlines?query=:query : search for the airline corresponding
     * to the query.
     *
     * @param query the query of the airline search
     * @return the result of the search
     */
    @GetMapping("/_search/airlines")
    @Timed
    public List<Airline> searchAirlines(@RequestParam String query) {
        log.debug("REST request to search Airlines for query {}", query);
        return StreamSupport
            .stream(airlineSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
