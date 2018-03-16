package com.space.book.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.space.book.domain.GroupAirlineAlliance;

import com.space.book.repository.GroupAirlineAllianceRepository;
import com.space.book.repository.search.GroupAirlineAllianceSearchRepository;
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
 * REST controller for managing GroupAirlineAlliance.
 */
@RestController
@RequestMapping("/api")
public class GroupAirlineAllianceResource {

    private final Logger log = LoggerFactory.getLogger(GroupAirlineAllianceResource.class);

    private static final String ENTITY_NAME = "groupAirlineAlliance";

    private final GroupAirlineAllianceRepository groupAirlineAllianceRepository;

    private final GroupAirlineAllianceSearchRepository groupAirlineAllianceSearchRepository;

    public GroupAirlineAllianceResource(GroupAirlineAllianceRepository groupAirlineAllianceRepository, GroupAirlineAllianceSearchRepository groupAirlineAllianceSearchRepository) {
        this.groupAirlineAllianceRepository = groupAirlineAllianceRepository;
        this.groupAirlineAllianceSearchRepository = groupAirlineAllianceSearchRepository;
    }

    /**
     * POST  /group-airline-alliances : Create a new groupAirlineAlliance.
     *
     * @param groupAirlineAlliance the groupAirlineAlliance to create
     * @return the ResponseEntity with status 201 (Created) and with body the new groupAirlineAlliance, or with status 400 (Bad Request) if the groupAirlineAlliance has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/group-airline-alliances")
    @Timed
    public ResponseEntity<GroupAirlineAlliance> createGroupAirlineAlliance(@Valid @RequestBody GroupAirlineAlliance groupAirlineAlliance) throws URISyntaxException {
        log.debug("REST request to save GroupAirlineAlliance : {}", groupAirlineAlliance);
        if (groupAirlineAlliance.getId() != null) {
            throw new BadRequestAlertException("A new groupAirlineAlliance cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GroupAirlineAlliance result = groupAirlineAllianceRepository.save(groupAirlineAlliance);
        groupAirlineAllianceSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/group-airline-alliances/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /group-airline-alliances : Updates an existing groupAirlineAlliance.
     *
     * @param groupAirlineAlliance the groupAirlineAlliance to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated groupAirlineAlliance,
     * or with status 400 (Bad Request) if the groupAirlineAlliance is not valid,
     * or with status 500 (Internal Server Error) if the groupAirlineAlliance couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/group-airline-alliances")
    @Timed
    public ResponseEntity<GroupAirlineAlliance> updateGroupAirlineAlliance(@Valid @RequestBody GroupAirlineAlliance groupAirlineAlliance) throws URISyntaxException {
        log.debug("REST request to update GroupAirlineAlliance : {}", groupAirlineAlliance);
        if (groupAirlineAlliance.getId() == null) {
            return createGroupAirlineAlliance(groupAirlineAlliance);
        }
        GroupAirlineAlliance result = groupAirlineAllianceRepository.save(groupAirlineAlliance);
        groupAirlineAllianceSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, groupAirlineAlliance.getId().toString()))
            .body(result);
    }

    /**
     * GET  /group-airline-alliances : get all the groupAirlineAlliances.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of groupAirlineAlliances in body
     */
    @GetMapping("/group-airline-alliances")
    @Timed
    public List<GroupAirlineAlliance> getAllGroupAirlineAlliances() {
        log.debug("REST request to get all GroupAirlineAlliances");
        return groupAirlineAllianceRepository.findAll();
        }

    /**
     * GET  /group-airline-alliances/:id : get the "id" groupAirlineAlliance.
     *
     * @param id the id of the groupAirlineAlliance to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the groupAirlineAlliance, or with status 404 (Not Found)
     */
    @GetMapping("/group-airline-alliances/{id}")
    @Timed
    public ResponseEntity<GroupAirlineAlliance> getGroupAirlineAlliance(@PathVariable Long id) {
        log.debug("REST request to get GroupAirlineAlliance : {}", id);
        GroupAirlineAlliance groupAirlineAlliance = groupAirlineAllianceRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(groupAirlineAlliance));
    }

    /**
     * DELETE  /group-airline-alliances/:id : delete the "id" groupAirlineAlliance.
     *
     * @param id the id of the groupAirlineAlliance to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/group-airline-alliances/{id}")
    @Timed
    public ResponseEntity<Void> deleteGroupAirlineAlliance(@PathVariable Long id) {
        log.debug("REST request to delete GroupAirlineAlliance : {}", id);
        groupAirlineAllianceRepository.delete(id);
        groupAirlineAllianceSearchRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/group-airline-alliances?query=:query : search for the groupAirlineAlliance corresponding
     * to the query.
     *
     * @param query the query of the groupAirlineAlliance search
     * @return the result of the search
     */
    @GetMapping("/_search/group-airline-alliances")
    @Timed
    public List<GroupAirlineAlliance> searchGroupAirlineAlliances(@RequestParam String query) {
        log.debug("REST request to search GroupAirlineAlliances for query {}", query);
        return StreamSupport
            .stream(groupAirlineAllianceSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
