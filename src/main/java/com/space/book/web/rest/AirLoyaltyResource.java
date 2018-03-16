package com.space.book.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.space.book.domain.AirLoyalty;

import com.space.book.repository.AirLoyaltyRepository;
import com.space.book.repository.search.AirLoyaltySearchRepository;
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
 * REST controller for managing AirLoyalty.
 */
@RestController
@RequestMapping("/api")
public class AirLoyaltyResource {

    private final Logger log = LoggerFactory.getLogger(AirLoyaltyResource.class);

    private static final String ENTITY_NAME = "airLoyalty";

    private final AirLoyaltyRepository airLoyaltyRepository;

    private final AirLoyaltySearchRepository airLoyaltySearchRepository;

    public AirLoyaltyResource(AirLoyaltyRepository airLoyaltyRepository, AirLoyaltySearchRepository airLoyaltySearchRepository) {
        this.airLoyaltyRepository = airLoyaltyRepository;
        this.airLoyaltySearchRepository = airLoyaltySearchRepository;
    }

    /**
     * POST  /air-loyalties : Create a new airLoyalty.
     *
     * @param airLoyalty the airLoyalty to create
     * @return the ResponseEntity with status 201 (Created) and with body the new airLoyalty, or with status 400 (Bad Request) if the airLoyalty has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/air-loyalties")
    @Timed
    public ResponseEntity<AirLoyalty> createAirLoyalty(@Valid @RequestBody AirLoyalty airLoyalty) throws URISyntaxException {
        log.debug("REST request to save AirLoyalty : {}", airLoyalty);
        if (airLoyalty.getId() != null) {
            throw new BadRequestAlertException("A new airLoyalty cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AirLoyalty result = airLoyaltyRepository.save(airLoyalty);
        airLoyaltySearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/air-loyalties/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /air-loyalties : Updates an existing airLoyalty.
     *
     * @param airLoyalty the airLoyalty to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated airLoyalty,
     * or with status 400 (Bad Request) if the airLoyalty is not valid,
     * or with status 500 (Internal Server Error) if the airLoyalty couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/air-loyalties")
    @Timed
    public ResponseEntity<AirLoyalty> updateAirLoyalty(@Valid @RequestBody AirLoyalty airLoyalty) throws URISyntaxException {
        log.debug("REST request to update AirLoyalty : {}", airLoyalty);
        if (airLoyalty.getId() == null) {
            return createAirLoyalty(airLoyalty);
        }
        AirLoyalty result = airLoyaltyRepository.save(airLoyalty);
        airLoyaltySearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, airLoyalty.getId().toString()))
            .body(result);
    }

    /**
     * GET  /air-loyalties : get all the airLoyalties.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of airLoyalties in body
     */
    @GetMapping("/air-loyalties")
    @Timed
    public List<AirLoyalty> getAllAirLoyalties() {
        log.debug("REST request to get all AirLoyalties");
        return airLoyaltyRepository.findAll();
        }

    /**
     * GET  /air-loyalties/:id : get the "id" airLoyalty.
     *
     * @param id the id of the airLoyalty to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the airLoyalty, or with status 404 (Not Found)
     */
    @GetMapping("/air-loyalties/{id}")
    @Timed
    public ResponseEntity<AirLoyalty> getAirLoyalty(@PathVariable Long id) {
        log.debug("REST request to get AirLoyalty : {}", id);
        AirLoyalty airLoyalty = airLoyaltyRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(airLoyalty));
    }

    /**
     * DELETE  /air-loyalties/:id : delete the "id" airLoyalty.
     *
     * @param id the id of the airLoyalty to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/air-loyalties/{id}")
    @Timed
    public ResponseEntity<Void> deleteAirLoyalty(@PathVariable Long id) {
        log.debug("REST request to delete AirLoyalty : {}", id);
        airLoyaltyRepository.delete(id);
        airLoyaltySearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/air-loyalties?query=:query : search for the airLoyalty corresponding
     * to the query.
     *
     * @param query the query of the airLoyalty search
     * @return the result of the search
     */
    @GetMapping("/_search/air-loyalties")
    @Timed
    public List<AirLoyalty> searchAirLoyalties(@RequestParam String query) {
        log.debug("REST request to search AirLoyalties for query {}", query);
        return StreamSupport
            .stream(airLoyaltySearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
