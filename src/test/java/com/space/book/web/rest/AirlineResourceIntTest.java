package com.space.book.web.rest;

import com.space.book.SpaceBookApp;

import com.space.book.domain.Airline;
import com.space.book.repository.AirlineRepository;
import com.space.book.repository.search.AirlineSearchRepository;
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
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.util.List;

import static com.space.book.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AirlineResource REST controller.
 *
 * @see AirlineResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SpaceBookApp.class)
public class AirlineResourceIntTest {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final byte[] DEFAULT_LOGO = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_LOGO = TestUtil.createByteArray(2, "1");
    private static final String DEFAULT_LOGO_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_LOGO_CONTENT_TYPE = "image/png";

    @Autowired
    private AirlineRepository airlineRepository;

    @Autowired
    private AirlineSearchRepository airlineSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAirlineMockMvc;

    private Airline airline;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AirlineResource airlineResource = new AirlineResource(airlineRepository, airlineSearchRepository);
        this.restAirlineMockMvc = MockMvcBuilders.standaloneSetup(airlineResource)
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
    public static Airline createEntity(EntityManager em) {
        Airline airline = new Airline()
            .code(DEFAULT_CODE)
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION)
            .logo(DEFAULT_LOGO)
            .logoContentType(DEFAULT_LOGO_CONTENT_TYPE);
        return airline;
    }

    @Before
    public void initTest() {
        airlineSearchRepository.deleteAll();
        airline = createEntity(em);
    }

    @Test
    @Transactional
    public void createAirline() throws Exception {
        int databaseSizeBeforeCreate = airlineRepository.findAll().size();

        // Create the Airline
        restAirlineMockMvc.perform(post("/api/airlines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(airline)))
            .andExpect(status().isCreated());

        // Validate the Airline in the database
        List<Airline> airlineList = airlineRepository.findAll();
        assertThat(airlineList).hasSize(databaseSizeBeforeCreate + 1);
        Airline testAirline = airlineList.get(airlineList.size() - 1);
        assertThat(testAirline.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testAirline.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testAirline.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testAirline.getLogo()).isEqualTo(DEFAULT_LOGO);
        assertThat(testAirline.getLogoContentType()).isEqualTo(DEFAULT_LOGO_CONTENT_TYPE);

        // Validate the Airline in Elasticsearch
        Airline airlineEs = airlineSearchRepository.findOne(testAirline.getId());
        assertThat(airlineEs).isEqualToIgnoringGivenFields(testAirline);
    }

    @Test
    @Transactional
    public void createAirlineWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = airlineRepository.findAll().size();

        // Create the Airline with an existing ID
        airline.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAirlineMockMvc.perform(post("/api/airlines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(airline)))
            .andExpect(status().isBadRequest());

        // Validate the Airline in the database
        List<Airline> airlineList = airlineRepository.findAll();
        assertThat(airlineList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = airlineRepository.findAll().size();
        // set the field null
        airline.setCode(null);

        // Create the Airline, which fails.

        restAirlineMockMvc.perform(post("/api/airlines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(airline)))
            .andExpect(status().isBadRequest());

        List<Airline> airlineList = airlineRepository.findAll();
        assertThat(airlineList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = airlineRepository.findAll().size();
        // set the field null
        airline.setName(null);

        // Create the Airline, which fails.

        restAirlineMockMvc.perform(post("/api/airlines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(airline)))
            .andExpect(status().isBadRequest());

        List<Airline> airlineList = airlineRepository.findAll();
        assertThat(airlineList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLogoIsRequired() throws Exception {
        int databaseSizeBeforeTest = airlineRepository.findAll().size();
        // set the field null
        airline.setLogo(null);

        // Create the Airline, which fails.

        restAirlineMockMvc.perform(post("/api/airlines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(airline)))
            .andExpect(status().isBadRequest());

        List<Airline> airlineList = airlineRepository.findAll();
        assertThat(airlineList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAirlines() throws Exception {
        // Initialize the database
        airlineRepository.saveAndFlush(airline);

        // Get all the airlineList
        restAirlineMockMvc.perform(get("/api/airlines?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(airline.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].logoContentType").value(hasItem(DEFAULT_LOGO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].logo").value(hasItem(Base64Utils.encodeToString(DEFAULT_LOGO))));
    }

    @Test
    @Transactional
    public void getAirline() throws Exception {
        // Initialize the database
        airlineRepository.saveAndFlush(airline);

        // Get the airline
        restAirlineMockMvc.perform(get("/api/airlines/{id}", airline.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(airline.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.logoContentType").value(DEFAULT_LOGO_CONTENT_TYPE))
            .andExpect(jsonPath("$.logo").value(Base64Utils.encodeToString(DEFAULT_LOGO)));
    }

    @Test
    @Transactional
    public void getNonExistingAirline() throws Exception {
        // Get the airline
        restAirlineMockMvc.perform(get("/api/airlines/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAirline() throws Exception {
        // Initialize the database
        airlineRepository.saveAndFlush(airline);
        airlineSearchRepository.save(airline);
        int databaseSizeBeforeUpdate = airlineRepository.findAll().size();

        // Update the airline
        Airline updatedAirline = airlineRepository.findOne(airline.getId());
        // Disconnect from session so that the updates on updatedAirline are not directly saved in db
        em.detach(updatedAirline);
        updatedAirline
            .code(UPDATED_CODE)
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION)
            .logo(UPDATED_LOGO)
            .logoContentType(UPDATED_LOGO_CONTENT_TYPE);

        restAirlineMockMvc.perform(put("/api/airlines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAirline)))
            .andExpect(status().isOk());

        // Validate the Airline in the database
        List<Airline> airlineList = airlineRepository.findAll();
        assertThat(airlineList).hasSize(databaseSizeBeforeUpdate);
        Airline testAirline = airlineList.get(airlineList.size() - 1);
        assertThat(testAirline.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testAirline.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testAirline.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testAirline.getLogo()).isEqualTo(UPDATED_LOGO);
        assertThat(testAirline.getLogoContentType()).isEqualTo(UPDATED_LOGO_CONTENT_TYPE);

        // Validate the Airline in Elasticsearch
        Airline airlineEs = airlineSearchRepository.findOne(testAirline.getId());
        assertThat(airlineEs).isEqualToIgnoringGivenFields(testAirline);
    }

    @Test
    @Transactional
    public void updateNonExistingAirline() throws Exception {
        int databaseSizeBeforeUpdate = airlineRepository.findAll().size();

        // Create the Airline

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAirlineMockMvc.perform(put("/api/airlines")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(airline)))
            .andExpect(status().isCreated());

        // Validate the Airline in the database
        List<Airline> airlineList = airlineRepository.findAll();
        assertThat(airlineList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAirline() throws Exception {
        // Initialize the database
        airlineRepository.saveAndFlush(airline);
        airlineSearchRepository.save(airline);
        int databaseSizeBeforeDelete = airlineRepository.findAll().size();

        // Get the airline
        restAirlineMockMvc.perform(delete("/api/airlines/{id}", airline.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean airlineExistsInEs = airlineSearchRepository.exists(airline.getId());
        assertThat(airlineExistsInEs).isFalse();

        // Validate the database is empty
        List<Airline> airlineList = airlineRepository.findAll();
        assertThat(airlineList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchAirline() throws Exception {
        // Initialize the database
        airlineRepository.saveAndFlush(airline);
        airlineSearchRepository.save(airline);

        // Search the airline
        restAirlineMockMvc.perform(get("/api/_search/airlines?query=id:" + airline.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(airline.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].logoContentType").value(hasItem(DEFAULT_LOGO_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].logo").value(hasItem(Base64Utils.encodeToString(DEFAULT_LOGO))));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Airline.class);
        Airline airline1 = new Airline();
        airline1.setId(1L);
        Airline airline2 = new Airline();
        airline2.setId(airline1.getId());
        assertThat(airline1).isEqualTo(airline2);
        airline2.setId(2L);
        assertThat(airline1).isNotEqualTo(airline2);
        airline1.setId(null);
        assertThat(airline1).isNotEqualTo(airline2);
    }
}
