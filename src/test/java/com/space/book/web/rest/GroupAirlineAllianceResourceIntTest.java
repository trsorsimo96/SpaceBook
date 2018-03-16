package com.space.book.web.rest;

import com.space.book.SpaceBookApp;

import com.space.book.domain.GroupAirlineAlliance;
import com.space.book.repository.GroupAirlineAllianceRepository;
import com.space.book.repository.search.GroupAirlineAllianceSearchRepository;
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
 * Test class for the GroupAirlineAllianceResource REST controller.
 *
 * @see GroupAirlineAllianceResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SpaceBookApp.class)
public class GroupAirlineAllianceResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    @Autowired
    private GroupAirlineAllianceRepository groupAirlineAllianceRepository;

    @Autowired
    private GroupAirlineAllianceSearchRepository groupAirlineAllianceSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGroupAirlineAllianceMockMvc;

    private GroupAirlineAlliance groupAirlineAlliance;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GroupAirlineAllianceResource groupAirlineAllianceResource = new GroupAirlineAllianceResource(groupAirlineAllianceRepository, groupAirlineAllianceSearchRepository);
        this.restGroupAirlineAllianceMockMvc = MockMvcBuilders.standaloneSetup(groupAirlineAllianceResource)
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
    public static GroupAirlineAlliance createEntity(EntityManager em) {
        GroupAirlineAlliance groupAirlineAlliance = new GroupAirlineAlliance()
            .name(DEFAULT_NAME)
            .code(DEFAULT_CODE);
        return groupAirlineAlliance;
    }

    @Before
    public void initTest() {
        groupAirlineAllianceSearchRepository.deleteAll();
        groupAirlineAlliance = createEntity(em);
    }

    @Test
    @Transactional
    public void createGroupAirlineAlliance() throws Exception {
        int databaseSizeBeforeCreate = groupAirlineAllianceRepository.findAll().size();

        // Create the GroupAirlineAlliance
        restGroupAirlineAllianceMockMvc.perform(post("/api/group-airline-alliances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(groupAirlineAlliance)))
            .andExpect(status().isCreated());

        // Validate the GroupAirlineAlliance in the database
        List<GroupAirlineAlliance> groupAirlineAllianceList = groupAirlineAllianceRepository.findAll();
        assertThat(groupAirlineAllianceList).hasSize(databaseSizeBeforeCreate + 1);
        GroupAirlineAlliance testGroupAirlineAlliance = groupAirlineAllianceList.get(groupAirlineAllianceList.size() - 1);
        assertThat(testGroupAirlineAlliance.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testGroupAirlineAlliance.getCode()).isEqualTo(DEFAULT_CODE);

        // Validate the GroupAirlineAlliance in Elasticsearch
        GroupAirlineAlliance groupAirlineAllianceEs = groupAirlineAllianceSearchRepository.findOne(testGroupAirlineAlliance.getId());
        assertThat(groupAirlineAllianceEs).isEqualToIgnoringGivenFields(testGroupAirlineAlliance);
    }

    @Test
    @Transactional
    public void createGroupAirlineAllianceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = groupAirlineAllianceRepository.findAll().size();

        // Create the GroupAirlineAlliance with an existing ID
        groupAirlineAlliance.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGroupAirlineAllianceMockMvc.perform(post("/api/group-airline-alliances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(groupAirlineAlliance)))
            .andExpect(status().isBadRequest());

        // Validate the GroupAirlineAlliance in the database
        List<GroupAirlineAlliance> groupAirlineAllianceList = groupAirlineAllianceRepository.findAll();
        assertThat(groupAirlineAllianceList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = groupAirlineAllianceRepository.findAll().size();
        // set the field null
        groupAirlineAlliance.setName(null);

        // Create the GroupAirlineAlliance, which fails.

        restGroupAirlineAllianceMockMvc.perform(post("/api/group-airline-alliances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(groupAirlineAlliance)))
            .andExpect(status().isBadRequest());

        List<GroupAirlineAlliance> groupAirlineAllianceList = groupAirlineAllianceRepository.findAll();
        assertThat(groupAirlineAllianceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = groupAirlineAllianceRepository.findAll().size();
        // set the field null
        groupAirlineAlliance.setCode(null);

        // Create the GroupAirlineAlliance, which fails.

        restGroupAirlineAllianceMockMvc.perform(post("/api/group-airline-alliances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(groupAirlineAlliance)))
            .andExpect(status().isBadRequest());

        List<GroupAirlineAlliance> groupAirlineAllianceList = groupAirlineAllianceRepository.findAll();
        assertThat(groupAirlineAllianceList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllGroupAirlineAlliances() throws Exception {
        // Initialize the database
        groupAirlineAllianceRepository.saveAndFlush(groupAirlineAlliance);

        // Get all the groupAirlineAllianceList
        restGroupAirlineAllianceMockMvc.perform(get("/api/group-airline-alliances?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(groupAirlineAlliance.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())));
    }

    @Test
    @Transactional
    public void getGroupAirlineAlliance() throws Exception {
        // Initialize the database
        groupAirlineAllianceRepository.saveAndFlush(groupAirlineAlliance);

        // Get the groupAirlineAlliance
        restGroupAirlineAllianceMockMvc.perform(get("/api/group-airline-alliances/{id}", groupAirlineAlliance.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(groupAirlineAlliance.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGroupAirlineAlliance() throws Exception {
        // Get the groupAirlineAlliance
        restGroupAirlineAllianceMockMvc.perform(get("/api/group-airline-alliances/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGroupAirlineAlliance() throws Exception {
        // Initialize the database
        groupAirlineAllianceRepository.saveAndFlush(groupAirlineAlliance);
        groupAirlineAllianceSearchRepository.save(groupAirlineAlliance);
        int databaseSizeBeforeUpdate = groupAirlineAllianceRepository.findAll().size();

        // Update the groupAirlineAlliance
        GroupAirlineAlliance updatedGroupAirlineAlliance = groupAirlineAllianceRepository.findOne(groupAirlineAlliance.getId());
        // Disconnect from session so that the updates on updatedGroupAirlineAlliance are not directly saved in db
        em.detach(updatedGroupAirlineAlliance);
        updatedGroupAirlineAlliance
            .name(UPDATED_NAME)
            .code(UPDATED_CODE);

        restGroupAirlineAllianceMockMvc.perform(put("/api/group-airline-alliances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedGroupAirlineAlliance)))
            .andExpect(status().isOk());

        // Validate the GroupAirlineAlliance in the database
        List<GroupAirlineAlliance> groupAirlineAllianceList = groupAirlineAllianceRepository.findAll();
        assertThat(groupAirlineAllianceList).hasSize(databaseSizeBeforeUpdate);
        GroupAirlineAlliance testGroupAirlineAlliance = groupAirlineAllianceList.get(groupAirlineAllianceList.size() - 1);
        assertThat(testGroupAirlineAlliance.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testGroupAirlineAlliance.getCode()).isEqualTo(UPDATED_CODE);

        // Validate the GroupAirlineAlliance in Elasticsearch
        GroupAirlineAlliance groupAirlineAllianceEs = groupAirlineAllianceSearchRepository.findOne(testGroupAirlineAlliance.getId());
        assertThat(groupAirlineAllianceEs).isEqualToIgnoringGivenFields(testGroupAirlineAlliance);
    }

    @Test
    @Transactional
    public void updateNonExistingGroupAirlineAlliance() throws Exception {
        int databaseSizeBeforeUpdate = groupAirlineAllianceRepository.findAll().size();

        // Create the GroupAirlineAlliance

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restGroupAirlineAllianceMockMvc.perform(put("/api/group-airline-alliances")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(groupAirlineAlliance)))
            .andExpect(status().isCreated());

        // Validate the GroupAirlineAlliance in the database
        List<GroupAirlineAlliance> groupAirlineAllianceList = groupAirlineAllianceRepository.findAll();
        assertThat(groupAirlineAllianceList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteGroupAirlineAlliance() throws Exception {
        // Initialize the database
        groupAirlineAllianceRepository.saveAndFlush(groupAirlineAlliance);
        groupAirlineAllianceSearchRepository.save(groupAirlineAlliance);
        int databaseSizeBeforeDelete = groupAirlineAllianceRepository.findAll().size();

        // Get the groupAirlineAlliance
        restGroupAirlineAllianceMockMvc.perform(delete("/api/group-airline-alliances/{id}", groupAirlineAlliance.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean groupAirlineAllianceExistsInEs = groupAirlineAllianceSearchRepository.exists(groupAirlineAlliance.getId());
        assertThat(groupAirlineAllianceExistsInEs).isFalse();

        // Validate the database is empty
        List<GroupAirlineAlliance> groupAirlineAllianceList = groupAirlineAllianceRepository.findAll();
        assertThat(groupAirlineAllianceList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchGroupAirlineAlliance() throws Exception {
        // Initialize the database
        groupAirlineAllianceRepository.saveAndFlush(groupAirlineAlliance);
        groupAirlineAllianceSearchRepository.save(groupAirlineAlliance);

        // Search the groupAirlineAlliance
        restGroupAirlineAllianceMockMvc.perform(get("/api/_search/group-airline-alliances?query=id:" + groupAirlineAlliance.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(groupAirlineAlliance.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GroupAirlineAlliance.class);
        GroupAirlineAlliance groupAirlineAlliance1 = new GroupAirlineAlliance();
        groupAirlineAlliance1.setId(1L);
        GroupAirlineAlliance groupAirlineAlliance2 = new GroupAirlineAlliance();
        groupAirlineAlliance2.setId(groupAirlineAlliance1.getId());
        assertThat(groupAirlineAlliance1).isEqualTo(groupAirlineAlliance2);
        groupAirlineAlliance2.setId(2L);
        assertThat(groupAirlineAlliance1).isNotEqualTo(groupAirlineAlliance2);
        groupAirlineAlliance1.setId(null);
        assertThat(groupAirlineAlliance1).isNotEqualTo(groupAirlineAlliance2);
    }
}
