package com.space.book.web.rest;

import com.space.book.SpaceBookApp;

import com.space.book.domain.Agent;
import com.space.book.repository.AgentRepository;
import com.space.book.repository.search.AgentSearchRepository;
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
 * Test class for the AgentResource REST controller.
 *
 * @see AgentResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SpaceBookApp.class)
public class AgentResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_SURNAME = "AAAAAAAAAA";
    private static final String UPDATED_SURNAME = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_CLIENT_ID = "AAAAAAAAAA";
    private static final String UPDATED_CLIENT_ID = "BBBBBBBBBB";

    private static final String DEFAULT_SIGN_ON_CODE = "AAAAAAAAAA";
    private static final String UPDATED_SIGN_ON_CODE = "BBBBBBBBBB";

    @Autowired
    private AgentRepository agentRepository;

    @Autowired
    private AgentSearchRepository agentSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAgentMockMvc;

    private Agent agent;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AgentResource agentResource = new AgentResource(agentRepository, agentSearchRepository);
        this.restAgentMockMvc = MockMvcBuilders.standaloneSetup(agentResource)
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
    public static Agent createEntity(EntityManager em) {
        Agent agent = new Agent()
            .name(DEFAULT_NAME)
            .surname(DEFAULT_SURNAME)
            .email(DEFAULT_EMAIL)
            .clientId(DEFAULT_CLIENT_ID)
            .signOnCode(DEFAULT_SIGN_ON_CODE);
        return agent;
    }

    @Before
    public void initTest() {
        agentSearchRepository.deleteAll();
        agent = createEntity(em);
    }

    @Test
    @Transactional
    public void createAgent() throws Exception {
        int databaseSizeBeforeCreate = agentRepository.findAll().size();

        // Create the Agent
        restAgentMockMvc.perform(post("/api/agents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agent)))
            .andExpect(status().isCreated());

        // Validate the Agent in the database
        List<Agent> agentList = agentRepository.findAll();
        assertThat(agentList).hasSize(databaseSizeBeforeCreate + 1);
        Agent testAgent = agentList.get(agentList.size() - 1);
        assertThat(testAgent.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testAgent.getSurname()).isEqualTo(DEFAULT_SURNAME);
        assertThat(testAgent.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testAgent.getClientId()).isEqualTo(DEFAULT_CLIENT_ID);
        assertThat(testAgent.getSignOnCode()).isEqualTo(DEFAULT_SIGN_ON_CODE);

        // Validate the Agent in Elasticsearch
        Agent agentEs = agentSearchRepository.findOne(testAgent.getId());
        assertThat(agentEs).isEqualToIgnoringGivenFields(testAgent);
    }

    @Test
    @Transactional
    public void createAgentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = agentRepository.findAll().size();

        // Create the Agent with an existing ID
        agent.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAgentMockMvc.perform(post("/api/agents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agent)))
            .andExpect(status().isBadRequest());

        // Validate the Agent in the database
        List<Agent> agentList = agentRepository.findAll();
        assertThat(agentList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = agentRepository.findAll().size();
        // set the field null
        agent.setName(null);

        // Create the Agent, which fails.

        restAgentMockMvc.perform(post("/api/agents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agent)))
            .andExpect(status().isBadRequest());

        List<Agent> agentList = agentRepository.findAll();
        assertThat(agentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSurnameIsRequired() throws Exception {
        int databaseSizeBeforeTest = agentRepository.findAll().size();
        // set the field null
        agent.setSurname(null);

        // Create the Agent, which fails.

        restAgentMockMvc.perform(post("/api/agents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agent)))
            .andExpect(status().isBadRequest());

        List<Agent> agentList = agentRepository.findAll();
        assertThat(agentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = agentRepository.findAll().size();
        // set the field null
        agent.setEmail(null);

        // Create the Agent, which fails.

        restAgentMockMvc.perform(post("/api/agents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agent)))
            .andExpect(status().isBadRequest());

        List<Agent> agentList = agentRepository.findAll();
        assertThat(agentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkClientIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = agentRepository.findAll().size();
        // set the field null
        agent.setClientId(null);

        // Create the Agent, which fails.

        restAgentMockMvc.perform(post("/api/agents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agent)))
            .andExpect(status().isBadRequest());

        List<Agent> agentList = agentRepository.findAll();
        assertThat(agentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSignOnCodeIsRequired() throws Exception {
        int databaseSizeBeforeTest = agentRepository.findAll().size();
        // set the field null
        agent.setSignOnCode(null);

        // Create the Agent, which fails.

        restAgentMockMvc.perform(post("/api/agents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agent)))
            .andExpect(status().isBadRequest());

        List<Agent> agentList = agentRepository.findAll();
        assertThat(agentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAgents() throws Exception {
        // Initialize the database
        agentRepository.saveAndFlush(agent);

        // Get all the agentList
        restAgentMockMvc.perform(get("/api/agents?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(agent.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].surname").value(hasItem(DEFAULT_SURNAME.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].clientId").value(hasItem(DEFAULT_CLIENT_ID.toString())))
            .andExpect(jsonPath("$.[*].signOnCode").value(hasItem(DEFAULT_SIGN_ON_CODE.toString())));
    }

    @Test
    @Transactional
    public void getAgent() throws Exception {
        // Initialize the database
        agentRepository.saveAndFlush(agent);

        // Get the agent
        restAgentMockMvc.perform(get("/api/agents/{id}", agent.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(agent.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.surname").value(DEFAULT_SURNAME.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.clientId").value(DEFAULT_CLIENT_ID.toString()))
            .andExpect(jsonPath("$.signOnCode").value(DEFAULT_SIGN_ON_CODE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAgent() throws Exception {
        // Get the agent
        restAgentMockMvc.perform(get("/api/agents/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAgent() throws Exception {
        // Initialize the database
        agentRepository.saveAndFlush(agent);
        agentSearchRepository.save(agent);
        int databaseSizeBeforeUpdate = agentRepository.findAll().size();

        // Update the agent
        Agent updatedAgent = agentRepository.findOne(agent.getId());
        // Disconnect from session so that the updates on updatedAgent are not directly saved in db
        em.detach(updatedAgent);
        updatedAgent
            .name(UPDATED_NAME)
            .surname(UPDATED_SURNAME)
            .email(UPDATED_EMAIL)
            .clientId(UPDATED_CLIENT_ID)
            .signOnCode(UPDATED_SIGN_ON_CODE);

        restAgentMockMvc.perform(put("/api/agents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAgent)))
            .andExpect(status().isOk());

        // Validate the Agent in the database
        List<Agent> agentList = agentRepository.findAll();
        assertThat(agentList).hasSize(databaseSizeBeforeUpdate);
        Agent testAgent = agentList.get(agentList.size() - 1);
        assertThat(testAgent.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testAgent.getSurname()).isEqualTo(UPDATED_SURNAME);
        assertThat(testAgent.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testAgent.getClientId()).isEqualTo(UPDATED_CLIENT_ID);
        assertThat(testAgent.getSignOnCode()).isEqualTo(UPDATED_SIGN_ON_CODE);

        // Validate the Agent in Elasticsearch
        Agent agentEs = agentSearchRepository.findOne(testAgent.getId());
        assertThat(agentEs).isEqualToIgnoringGivenFields(testAgent);
    }

    @Test
    @Transactional
    public void updateNonExistingAgent() throws Exception {
        int databaseSizeBeforeUpdate = agentRepository.findAll().size();

        // Create the Agent

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAgentMockMvc.perform(put("/api/agents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(agent)))
            .andExpect(status().isCreated());

        // Validate the Agent in the database
        List<Agent> agentList = agentRepository.findAll();
        assertThat(agentList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAgent() throws Exception {
        // Initialize the database
        agentRepository.saveAndFlush(agent);
        agentSearchRepository.save(agent);
        int databaseSizeBeforeDelete = agentRepository.findAll().size();

        // Get the agent
        restAgentMockMvc.perform(delete("/api/agents/{id}", agent.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean agentExistsInEs = agentSearchRepository.exists(agent.getId());
        assertThat(agentExistsInEs).isFalse();

        // Validate the database is empty
        List<Agent> agentList = agentRepository.findAll();
        assertThat(agentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchAgent() throws Exception {
        // Initialize the database
        agentRepository.saveAndFlush(agent);
        agentSearchRepository.save(agent);

        // Search the agent
        restAgentMockMvc.perform(get("/api/_search/agents?query=id:" + agent.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(agent.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].surname").value(hasItem(DEFAULT_SURNAME.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].clientId").value(hasItem(DEFAULT_CLIENT_ID.toString())))
            .andExpect(jsonPath("$.[*].signOnCode").value(hasItem(DEFAULT_SIGN_ON_CODE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Agent.class);
        Agent agent1 = new Agent();
        agent1.setId(1L);
        Agent agent2 = new Agent();
        agent2.setId(agent1.getId());
        assertThat(agent1).isEqualTo(agent2);
        agent2.setId(2L);
        assertThat(agent1).isNotEqualTo(agent2);
        agent1.setId(null);
        assertThat(agent1).isNotEqualTo(agent2);
    }
}
