package com.space.book.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.space.book.domain.ConfigFees;

import com.space.book.repository.ConfigFeesRepository;
import com.space.book.repository.search.ConfigFeesSearchRepository;
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
 * REST controller for managing ConfigFees.
 */
@RestController
@RequestMapping("/api")
public class ConfigFeesResource {

    private final Logger log = LoggerFactory.getLogger(ConfigFeesResource.class);

    private static final String ENTITY_NAME = "configFees";

    private final ConfigFeesRepository configFeesRepository;

    private final ConfigFeesSearchRepository configFeesSearchRepository;

    public ConfigFeesResource(ConfigFeesRepository configFeesRepository, ConfigFeesSearchRepository configFeesSearchRepository) {
        this.configFeesRepository = configFeesRepository;
        this.configFeesSearchRepository = configFeesSearchRepository;
    }

    /**
     * POST  /config-fees : Create a new configFees.
     *
     * @param configFees the configFees to create
     * @return the ResponseEntity with status 201 (Created) and with body the new configFees, or with status 400 (Bad Request) if the configFees has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/config-fees")
    @Timed
    public ResponseEntity<ConfigFees> createConfigFees(@Valid @RequestBody ConfigFees configFees) throws URISyntaxException {
        log.debug("REST request to save ConfigFees : {}", configFees);
        if (configFees.getId() != null) {
            throw new BadRequestAlertException("A new configFees cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ConfigFees result = configFeesRepository.save(configFees);
        configFeesSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/config-fees/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /config-fees : Updates an existing configFees.
     *
     * @param configFees the configFees to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated configFees,
     * or with status 400 (Bad Request) if the configFees is not valid,
     * or with status 500 (Internal Server Error) if the configFees couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/config-fees")
    @Timed
    public ResponseEntity<ConfigFees> updateConfigFees(@Valid @RequestBody ConfigFees configFees) throws URISyntaxException {
        log.debug("REST request to update ConfigFees : {}", configFees);
        if (configFees.getId() == null) {
            return createConfigFees(configFees);
        }
        ConfigFees result = configFeesRepository.save(configFees);
        configFeesSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, configFees.getId().toString()))
            .body(result);
    }

    /**
     * GET  /config-fees : get all the configFees.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of configFees in body
     */
    @GetMapping("/config-fees")
    @Timed
    public List<ConfigFees> getAllConfigFees() {
        log.debug("REST request to get all ConfigFees");
        return configFeesRepository.findAll();
        }

    /**
     * GET  /config-fees/:id : get the "id" configFees.
     *
     * @param id the id of the configFees to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the configFees, or with status 404 (Not Found)
     */
    @GetMapping("/config-fees/{id}")
    @Timed
    public ResponseEntity<ConfigFees> getConfigFees(@PathVariable Long id) {
        log.debug("REST request to get ConfigFees : {}", id);
        ConfigFees configFees = configFeesRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(configFees));
    }

    /**
     * DELETE  /config-fees/:id : delete the "id" configFees.
     *
     * @param id the id of the configFees to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/config-fees/{id}")
    @Timed
    public ResponseEntity<Void> deleteConfigFees(@PathVariable Long id) {
        log.debug("REST request to delete ConfigFees : {}", id);
        configFeesRepository.delete(id);
        configFeesSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/config-fees?query=:query : search for the configFees corresponding
     * to the query.
     *
     * @param query the query of the configFees search
     * @return the result of the search
     */
    @GetMapping("/_search/config-fees")
    @Timed
    public List<ConfigFees> searchConfigFees(@RequestParam String query) {
        log.debug("REST request to search ConfigFees for query {}", query);
        return StreamSupport
            .stream(configFeesSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
