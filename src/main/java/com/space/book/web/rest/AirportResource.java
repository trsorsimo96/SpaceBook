package com.space.book.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.space.book.domain.Airport;

import com.space.book.repository.AirportRepository;
import com.space.book.repository.search.AirportSearchRepository;
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
 * REST controller for managing Airport.
 */
@RestController
@RequestMapping("/api")
public class AirportResource {

    private final Logger log = LoggerFactory.getLogger(AirportResource.class);

    private static final String ENTITY_NAME = "airport";

    private final AirportRepository airportRepository;

    private final AirportSearchRepository airportSearchRepository;

    public AirportResource(AirportRepository airportRepository, AirportSearchRepository airportSearchRepository) {
        this.airportRepository = airportRepository;
        this.airportSearchRepository = airportSearchRepository;
    }

    /**
     * POST  /airports : Create a new airport.
     *
     * @param airport the airport to create
     * @return the ResponseEntity with status 201 (Created) and with body the new airport, or with status 400 (Bad Request) if the airport has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/airports")
    @Timed
    public ResponseEntity<Airport> createAirport(@Valid @RequestBody Airport airport) throws URISyntaxException {
        log.debug("REST request to save Airport : {}", airport);
        if (airport.getId() != null) {
            throw new BadRequestAlertException("A new airport cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Airport result = airportRepository.save(airport);
        airportSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/airports/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /airports : Updates an existing airport.
     *
     * @param airport the airport to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated airport,
     * or with status 400 (Bad Request) if the airport is not valid,
     * or with status 500 (Internal Server Error) if the airport couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/airports")
    @Timed
    public ResponseEntity<Airport> updateAirport(@Valid @RequestBody Airport airport) throws URISyntaxException {
        log.debug("REST request to update Airport : {}", airport);
        if (airport.getId() == null) {
            return createAirport(airport);
        }
        Airport result = airportRepository.save(airport);
        airportSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, airport.getId().toString()))
            .body(result);
    }

    /**
     * GET  /airports : get all the airports.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of airports in body
     */
    @GetMapping("/airports")
    @Timed
    public List<Airport> getAllAirports() {
        log.debug("REST request to get all Airports");
        return airportRepository.findAll();
        }

    /**
     * GET  /airports/:id : get the "id" airport.
     *
     * @param id the id of the airport to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the airport, or with status 404 (Not Found)
     */
    @GetMapping("/airports/{id}")
    @Timed
    public ResponseEntity<Airport> getAirport(@PathVariable Long id) {
        log.debug("REST request to get Airport : {}", id);
        Airport airport = airportRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(airport));
    }

    /**
     * DELETE  /airports/:id : delete the "id" airport.
     *
     * @param id the id of the airport to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/airports/{id}")
    @Timed
    public ResponseEntity<Void> deleteAirport(@PathVariable Long id) {
        log.debug("REST request to delete Airport : {}", id);
        airportRepository.delete(id);
        airportSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/airports?query=:query : search for the airport corresponding
     * to the query.
     *
     * @param query the query of the airport search
     * @return the result of the search
     */
    @GetMapping("/_search/airports")
    @Timed
    public List<Airport> searchAirports(@RequestParam String query) {
        log.debug("REST request to search Airports for query {}", query);
        return StreamSupport
            .stream(airportSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
