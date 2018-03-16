package com.space.book.web.rest;

import com.space.book.SpaceBookApp;

import com.space.book.domain.Corporate;
import com.space.book.repository.CorporateRepository;
import com.space.book.repository.search.CorporateSearchRepository;
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
 * Test class for the CorporateResource REST controller.
 *
 * @see CorporateResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SpaceBookApp.class)
public class CorporateResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS = "BBBBBBBBBB";

    private static final String DEFAULT_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_PHONE = "BBBBBBBBBB";

    @Autowired
    private CorporateRepository corporateRepository;

    @Autowired
    private CorporateSearchRepository corporateSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCorporateMockMvc;

    private Corporate corporate;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CorporateResource corporateResource = new CorporateResource(corporateRepository, corporateSearchRepository);
        this.restCorporateMockMvc = MockMvcBuilders.standaloneSetup(corporateResource)
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
    public static Corporate createEntity(EntityManager em) {
        Corporate corporate = new Corporate()
            .name(DEFAULT_NAME)
            .email(DEFAULT_EMAIL)
            .address(DEFAULT_ADDRESS)
            .phone(DEFAULT_PHONE);
        return corporate;
    }

    @Before
    public void initTest() {
        corporateSearchRepository.deleteAll();
        corporate = createEntity(em);
    }

    @Test
    @Transactional
    public void createCorporate() throws Exception {
        int databaseSizeBeforeCreate = corporateRepository.findAll().size();

        // Create the Corporate
        restCorporateMockMvc.perform(post("/api/corporates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(corporate)))
            .andExpect(status().isCreated());

        // Validate the Corporate in the database
        List<Corporate> corporateList = corporateRepository.findAll();
        assertThat(corporateList).hasSize(databaseSizeBeforeCreate + 1);
        Corporate testCorporate = corporateList.get(corporateList.size() - 1);
        assertThat(testCorporate.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testCorporate.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testCorporate.getAddress()).isEqualTo(DEFAULT_ADDRESS);
        assertThat(testCorporate.getPhone()).isEqualTo(DEFAULT_PHONE);

        // Validate the Corporate in Elasticsearch
        Corporate corporateEs = corporateSearchRepository.findOne(testCorporate.getId());
        assertThat(corporateEs).isEqualToIgnoringGivenFields(testCorporate);
    }

    @Test
    @Transactional
    public void createCorporateWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = corporateRepository.findAll().size();

        // Create the Corporate with an existing ID
        corporate.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCorporateMockMvc.perform(post("/api/corporates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(corporate)))
            .andExpect(status().isBadRequest());

        // Validate the Corporate in the database
        List<Corporate> corporateList = corporateRepository.findAll();
        assertThat(corporateList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = corporateRepository.findAll().size();
        // set the field null
        corporate.setName(null);

        // Create the Corporate, which fails.

        restCorporateMockMvc.perform(post("/api/corporates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(corporate)))
            .andExpect(status().isBadRequest());

        List<Corporate> corporateList = corporateRepository.findAll();
        assertThat(corporateList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = corporateRepository.findAll().size();
        // set the field null
        corporate.setEmail(null);

        // Create the Corporate, which fails.

        restCorporateMockMvc.perform(post("/api/corporates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(corporate)))
            .andExpect(status().isBadRequest());

        List<Corporate> corporateList = corporateRepository.findAll();
        assertThat(corporateList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCorporates() throws Exception {
        // Initialize the database
        corporateRepository.saveAndFlush(corporate);

        // Get all the corporateList
        restCorporateMockMvc.perform(get("/api/corporates?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(corporate.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS.toString())))
            .andExpect(jsonPath("$.[*].phone").value(hasItem(DEFAULT_PHONE.toString())));
    }

    @Test
    @Transactional
    public void getCorporate() throws Exception {
        // Initialize the database
        corporateRepository.saveAndFlush(corporate);

        // Get the corporate
        restCorporateMockMvc.perform(get("/api/corporates/{id}", corporate.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(corporate.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS.toString()))
            .andExpect(jsonPath("$.phone").value(DEFAULT_PHONE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCorporate() throws Exception {
        // Get the corporate
        restCorporateMockMvc.perform(get("/api/corporates/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCorporate() throws Exception {
        // Initialize the database
        corporateRepository.saveAndFlush(corporate);
        corporateSearchRepository.save(corporate);
        int databaseSizeBeforeUpdate = corporateRepository.findAll().size();

        // Update the corporate
        Corporate updatedCorporate = corporateRepository.findOne(corporate.getId());
        // Disconnect from session so that the updates on updatedCorporate are not directly saved in db
        em.detach(updatedCorporate);
        updatedCorporate
            .name(UPDATED_NAME)
            .email(UPDATED_EMAIL)
            .address(UPDATED_ADDRESS)
            .phone(UPDATED_PHONE);

        restCorporateMockMvc.perform(put("/api/corporates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCorporate)))
            .andExpect(status().isOk());

        // Validate the Corporate in the database
        List<Corporate> corporateList = corporateRepository.findAll();
        assertThat(corporateList).hasSize(databaseSizeBeforeUpdate);
        Corporate testCorporate = corporateList.get(corporateList.size() - 1);
        assertThat(testCorporate.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testCorporate.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testCorporate.getAddress()).isEqualTo(UPDATED_ADDRESS);
        assertThat(testCorporate.getPhone()).isEqualTo(UPDATED_PHONE);

        // Validate the Corporate in Elasticsearch
        Corporate corporateEs = corporateSearchRepository.findOne(testCorporate.getId());
        assertThat(corporateEs).isEqualToIgnoringGivenFields(testCorporate);
    }

    @Test
    @Transactional
    public void updateNonExistingCorporate() throws Exception {
        int databaseSizeBeforeUpdate = corporateRepository.findAll().size();

        // Create the Corporate

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCorporateMockMvc.perform(put("/api/corporates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(corporate)))
            .andExpect(status().isCreated());

        // Validate the Corporate in the database
        List<Corporate> corporateList = corporateRepository.findAll();
        assertThat(corporateList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteCorporate() throws Exception {
        // Initialize the database
        corporateRepository.saveAndFlush(corporate);
        corporateSearchRepository.save(corporate);
        int databaseSizeBeforeDelete = corporateRepository.findAll().size();

        // Get the corporate
        restCorporateMockMvc.perform(delete("/api/corporates/{id}", corporate.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean corporateExistsInEs = corporateSearchRepository.exists(corporate.getId());
        assertThat(corporateExistsInEs).isFalse();

        // Validate the database is empty
        List<Corporate> corporateList = corporateRepository.findAll();
        assertThat(corporateList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchCorporate() throws Exception {
        // Initialize the database
        corporateRepository.saveAndFlush(corporate);
        corporateSearchRepository.save(corporate);

        // Search the corporate
        restCorporateMockMvc.perform(get("/api/_search/corporates?query=id:" + corporate.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(corporate.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS.toString())))
            .andExpect(jsonPath("$.[*].phone").value(hasItem(DEFAULT_PHONE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Corporate.class);
        Corporate corporate1 = new Corporate();
        corporate1.setId(1L);
        Corporate corporate2 = new Corporate();
        corporate2.setId(corporate1.getId());
        assertThat(corporate1).isEqualTo(corporate2);
        corporate2.setId(2L);
        assertThat(corporate1).isNotEqualTo(corporate2);
        corporate1.setId(null);
        assertThat(corporate1).isNotEqualTo(corporate2);
    }
}
