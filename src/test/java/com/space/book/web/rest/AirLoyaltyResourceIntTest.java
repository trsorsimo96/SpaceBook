package com.space.book.web.rest;

import com.space.book.SpaceBookApp;

import com.space.book.domain.AirLoyalty;
import com.space.book.repository.AirLoyaltyRepository;
import com.space.book.repository.search.AirLoyaltySearchRepository;
import com.space.book.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static com.space.book.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AirLoyaltyResource REST controller.
 *
 * @see AirLoyaltyResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SpaceBookApp.class)
public class AirLoyaltyResourceIntTest {

    private static final String DEFAULT_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_NUMBER = "BBBBBBBBBB";

    @Autowired
    private AirLoyaltyRepository airLoyaltyRepository;

    @Autowired
    private AirLoyaltySearchRepository airLoyaltySearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAirLoyaltyMockMvc;

    private AirLoyalty airLoyalty;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AirLoyaltyResource airLoyaltyResource = new AirLoyaltyResource(airLoyaltyRepository, airLoyaltySearchRepository);
        this.restAirLoyaltyMockMvc = MockMvcBuilders.standaloneSetup(airLoyaltyResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AirLoyalty createEntity(EntityManager em) {
        AirLoyalty airLoyalty = new AirLoyalty()
            .number(DEFAULT_NUMBER);
        return airLoyalty;
    }

    @Before
    public void initTest() {
        airLoyaltySearchRepository.deleteAll();
        airLoyalty = createEntity(em);
    }

    @Test
    @Transactional
    public void createAirLoyalty() throws Exception {
        int databaseSizeBeforeCreate = airLoyaltyRepository.findAll().size();

        // Create the AirLoyalty
        restAirLoyaltyMockMvc.perform(post("/api/air-loyalties")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(airLoyalty)))
            .andExpect(status().isCreated());

        // Validate the AirLoyalty in the database
        List<AirLoyalty> airLoyaltyList = airLoyaltyRepository.findAll();
        assertThat(airLoyaltyList).hasSize(databaseSizeBeforeCreate + 1);
        AirLoyalty testAirLoyalty = airLoyaltyList.get(airLoyaltyList.size() - 1);
        assertThat(testAirLoyalty.getNumber()).isEqualTo(DEFAULT_NUMBER);

        // Validate the AirLoyalty in Elasticsearch
        AirLoyalty airLoyaltyEs = airLoyaltySearchRepository.findOne(testAirLoyalty.getId());
        assertThat(airLoyaltyEs).isEqualToIgnoringGivenFields(testAirLoyalty);
    }

    @Test
    @Transactional
    public void createAirLoyaltyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = airLoyaltyRepository.findAll().size();

        // Create the AirLoyalty with an existing ID
        airLoyalty.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAirLoyaltyMockMvc.perform(post("/api/air-loyalties")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(airLoyalty)))
            .andExpect(status().isBadRequest());

        // Validate the AirLoyalty in the database
        List<AirLoyalty> airLoyaltyList = airLoyaltyRepository.findAll();
        assertThat(airLoyaltyList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = airLoyaltyRepository.findAll().size();
        // set the field null
        airLoyalty.setNumber(null);

        // Create the AirLoyalty, which fails.

        restAirLoyaltyMockMvc.perform(post("/api/air-loyalties")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(airLoyalty)))
            .andExpect(status().isBadRequest());

        List<AirLoyalty> airLoyaltyList = airLoyaltyRepository.findAll();
        assertThat(airLoyaltyList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAirLoyalties() throws Exception {
        // Initialize the database
        airLoyaltyRepository.saveAndFlush(airLoyalty);

        // Get all the airLoyaltyList
        restAirLoyaltyMockMvc.perform(get("/api/air-loyalties?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(airLoyalty.getId().intValue())))
            .andExpect(jsonPath("$.[*].number").value(hasItem(DEFAULT_NUMBER.toString())));
    }

    @Test
    @Transactional
    public void getAirLoyalty() throws Exception {
        // Initialize the database
        airLoyaltyRepository.saveAndFlush(airLoyalty);

        // Get the airLoyalty
        restAirLoyaltyMockMvc.perform(get("/api/air-loyalties/{id}", airLoyalty.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(airLoyalty.getId().intValue()))
            .andExpect(jsonPath("$.number").value(DEFAULT_NUMBER.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAirLoyalty() throws Exception {
        // Get the airLoyalty
        restAirLoyaltyMockMvc.perform(get("/api/air-loyalties/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAirLoyalty() throws Exception {
        // Initialize the database
        airLoyaltyRepository.saveAndFlush(airLoyalty);
        airLoyaltySearchRepository.save(airLoyalty);
        int databaseSizeBeforeUpdate = airLoyaltyRepository.findAll().size();

        // Update the airLoyalty
        AirLoyalty updatedAirLoyalty = airLoyaltyRepository.findOne(airLoyalty.getId());
        // Disconnect from session so that the updates on updatedAirLoyalty are not directly saved in db
        em.detach(updatedAirLoyalty);
        updatedAirLoyalty
            .number(UPDATED_NUMBER);

        restAirLoyaltyMockMvc.perform(put("/api/air-loyalties")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAirLoyalty)))
            .andExpect(status().isOk());

        // Validate the AirLoyalty in the database
        List<AirLoyalty> airLoyaltyList = airLoyaltyRepository.findAll();
        assertThat(airLoyaltyList).hasSize(databaseSizeBeforeUpdate);
        AirLoyalty testAirLoyalty = airLoyaltyList.get(airLoyaltyList.size() - 1);
        assertThat(testAirLoyalty.getNumber()).isEqualTo(UPDATED_NUMBER);

        // Validate the AirLoyalty in Elasticsearch
        AirLoyalty airLoyaltyEs = airLoyaltySearchRepository.findOne(testAirLoyalty.getId());
        assertThat(airLoyaltyEs).isEqualToIgnoringGivenFields(testAirLoyalty);
    }

    @Test
    @Transactional
    public void updateNonExistingAirLoyalty() throws Exception {
        int databaseSizeBeforeUpdate = airLoyaltyRepository.findAll().size();

        // Create the AirLoyalty

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAirLoyaltyMockMvc.perform(put("/api/air-loyalties")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(airLoyalty)))
            .andExpect(status().isCreated());

        // Validate the AirLoyalty in the database
        List<AirLoyalty> airLoyaltyList = airLoyaltyRepository.findAll();
        assertThat(airLoyaltyList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAirLoyalty() throws Exception {
        // Initialize the database
        airLoyaltyRepository.saveAndFlush(airLoyalty);
        airLoyaltySearchRepository.save(airLoyalty);
        int databaseSizeBeforeDelete = airLoyaltyRepository.findAll().size();

        // Get the airLoyalty
        restAirLoyaltyMockMvc.perform(delete("/api/air-loyalties/{id}", airLoyalty.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean airLoyaltyExistsInEs = airLoyaltySearchRepository.exists(airLoyalty.getId());
        assertThat(airLoyaltyExistsInEs).isFalse();

        // Validate the database is empty
        List<AirLoyalty> airLoyaltyList = airLoyaltyRepository.findAll();
        assertThat(airLoyaltyList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchAirLoyalty() throws Exception {
        // Initialize the database
        airLoyaltyRepository.saveAndFlush(airLoyalty);
        airLoyaltySearchRepository.save(airLoyalty);

        // Search the airLoyalty
        restAirLoyaltyMockMvc.perform(get("/api/_search/air-loyalties?query=id:" + airLoyalty.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(airLoyalty.getId().intValue())))
            .andExpect(jsonPath("$.[*].number").value(hasItem(DEFAULT_NUMBER.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AirLoyalty.class);
        AirLoyalty airLoyalty1 = new AirLoyalty();
        airLoyalty1.setId(1L);
        AirLoyalty airLoyalty2 = new AirLoyalty();
        airLoyalty2.setId(airLoyalty1.getId());
        assertThat(airLoyalty1).isEqualTo(airLoyalty2);
        airLoyalty2.setId(2L);
        assertThat(airLoyalty1).isNotEqualTo(airLoyalty2);
        airLoyalty1.setId(null);
        assertThat(airLoyalty1).isNotEqualTo(airLoyalty2);
    }
}
