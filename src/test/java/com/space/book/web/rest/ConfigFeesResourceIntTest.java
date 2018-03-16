package com.space.book.web.rest;

import com.space.book.SpaceBookApp;

import com.space.book.domain.ConfigFees;
import com.space.book.repository.ConfigFeesRepository;
import com.space.book.repository.search.ConfigFeesSearchRepository;
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
 * Test class for the ConfigFeesResource REST controller.
 *
 * @see ConfigFeesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SpaceBookApp.class)
public class ConfigFeesResourceIntTest {

    private static final Integer DEFAULT_FEES = 1;
    private static final Integer UPDATED_FEES = 2;

    @Autowired
    private ConfigFeesRepository configFeesRepository;

    @Autowired
    private ConfigFeesSearchRepository configFeesSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restConfigFeesMockMvc;

    private ConfigFees configFees;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ConfigFeesResource configFeesResource = new ConfigFeesResource(configFeesRepository, configFeesSearchRepository);
        this.restConfigFeesMockMvc = MockMvcBuilders.standaloneSetup(configFeesResource)
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
    public static ConfigFees createEntity(EntityManager em) {
        ConfigFees configFees = new ConfigFees()
            .fees(DEFAULT_FEES);
        return configFees;
    }

    @Before
    public void initTest() {
        configFeesSearchRepository.deleteAll();
        configFees = createEntity(em);
    }

    @Test
    @Transactional
    public void createConfigFees() throws Exception {
        int databaseSizeBeforeCreate = configFeesRepository.findAll().size();

        // Create the ConfigFees
        restConfigFeesMockMvc.perform(post("/api/config-fees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(configFees)))
            .andExpect(status().isCreated());

        // Validate the ConfigFees in the database
        List<ConfigFees> configFeesList = configFeesRepository.findAll();
        assertThat(configFeesList).hasSize(databaseSizeBeforeCreate + 1);
        ConfigFees testConfigFees = configFeesList.get(configFeesList.size() - 1);
        assertThat(testConfigFees.getFees()).isEqualTo(DEFAULT_FEES);

        // Validate the ConfigFees in Elasticsearch
        ConfigFees configFeesEs = configFeesSearchRepository.findOne(testConfigFees.getId());
        assertThat(configFeesEs).isEqualToIgnoringGivenFields(testConfigFees);
    }

    @Test
    @Transactional
    public void createConfigFeesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = configFeesRepository.findAll().size();

        // Create the ConfigFees with an existing ID
        configFees.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restConfigFeesMockMvc.perform(post("/api/config-fees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(configFees)))
            .andExpect(status().isBadRequest());

        // Validate the ConfigFees in the database
        List<ConfigFees> configFeesList = configFeesRepository.findAll();
        assertThat(configFeesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkFeesIsRequired() throws Exception {
        int databaseSizeBeforeTest = configFeesRepository.findAll().size();
        // set the field null
        configFees.setFees(null);

        // Create the ConfigFees, which fails.

        restConfigFeesMockMvc.perform(post("/api/config-fees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(configFees)))
            .andExpect(status().isBadRequest());

        List<ConfigFees> configFeesList = configFeesRepository.findAll();
        assertThat(configFeesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllConfigFees() throws Exception {
        // Initialize the database
        configFeesRepository.saveAndFlush(configFees);

        // Get all the configFeesList
        restConfigFeesMockMvc.perform(get("/api/config-fees?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(configFees.getId().intValue())))
            .andExpect(jsonPath("$.[*].fees").value(hasItem(DEFAULT_FEES)));
    }

    @Test
    @Transactional
    public void getConfigFees() throws Exception {
        // Initialize the database
        configFeesRepository.saveAndFlush(configFees);

        // Get the configFees
        restConfigFeesMockMvc.perform(get("/api/config-fees/{id}", configFees.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(configFees.getId().intValue()))
            .andExpect(jsonPath("$.fees").value(DEFAULT_FEES));
    }

    @Test
    @Transactional
    public void getNonExistingConfigFees() throws Exception {
        // Get the configFees
        restConfigFeesMockMvc.perform(get("/api/config-fees/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateConfigFees() throws Exception {
        // Initialize the database
        configFeesRepository.saveAndFlush(configFees);
        configFeesSearchRepository.save(configFees);
        int databaseSizeBeforeUpdate = configFeesRepository.findAll().size();

        // Update the configFees
        ConfigFees updatedConfigFees = configFeesRepository.findOne(configFees.getId());
        // Disconnect from session so that the updates on updatedConfigFees are not directly saved in db
        em.detach(updatedConfigFees);
        updatedConfigFees
            .fees(UPDATED_FEES);

        restConfigFeesMockMvc.perform(put("/api/config-fees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedConfigFees)))
            .andExpect(status().isOk());

        // Validate the ConfigFees in the database
        List<ConfigFees> configFeesList = configFeesRepository.findAll();
        assertThat(configFeesList).hasSize(databaseSizeBeforeUpdate);
        ConfigFees testConfigFees = configFeesList.get(configFeesList.size() - 1);
        assertThat(testConfigFees.getFees()).isEqualTo(UPDATED_FEES);

        // Validate the ConfigFees in Elasticsearch
        ConfigFees configFeesEs = configFeesSearchRepository.findOne(testConfigFees.getId());
        assertThat(configFeesEs).isEqualToIgnoringGivenFields(testConfigFees);
    }

    @Test
    @Transactional
    public void updateNonExistingConfigFees() throws Exception {
        int databaseSizeBeforeUpdate = configFeesRepository.findAll().size();

        // Create the ConfigFees

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restConfigFeesMockMvc.perform(put("/api/config-fees")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(configFees)))
            .andExpect(status().isCreated());

        // Validate the ConfigFees in the database
        List<ConfigFees> configFeesList = configFeesRepository.findAll();
        assertThat(configFeesList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteConfigFees() throws Exception {
        // Initialize the database
        configFeesRepository.saveAndFlush(configFees);
        configFeesSearchRepository.save(configFees);
        int databaseSizeBeforeDelete = configFeesRepository.findAll().size();

        // Get the configFees
        restConfigFeesMockMvc.perform(delete("/api/config-fees/{id}", configFees.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean configFeesExistsInEs = configFeesSearchRepository.exists(configFees.getId());
        assertThat(configFeesExistsInEs).isFalse();

        // Validate the database is empty
        List<ConfigFees> configFeesList = configFeesRepository.findAll();
        assertThat(configFeesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchConfigFees() throws Exception {
        // Initialize the database
        configFeesRepository.saveAndFlush(configFees);
        configFeesSearchRepository.save(configFees);

        // Search the configFees
        restConfigFeesMockMvc.perform(get("/api/_search/config-fees?query=id:" + configFees.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(configFees.getId().intValue())))
            .andExpect(jsonPath("$.[*].fees").value(hasItem(DEFAULT_FEES)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ConfigFees.class);
        ConfigFees configFees1 = new ConfigFees();
        configFees1.setId(1L);
        ConfigFees configFees2 = new ConfigFees();
        configFees2.setId(configFees1.getId());
        assertThat(configFees1).isEqualTo(configFees2);
        configFees2.setId(2L);
        assertThat(configFees1).isNotEqualTo(configFees2);
        configFees1.setId(null);
        assertThat(configFees1).isNotEqualTo(configFees2);
    }
}
