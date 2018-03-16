package com.space.book.web.rest;

import com.space.book.SpaceBookApp;

import com.space.book.domain.EmailInBooking;
import com.space.book.repository.EmailInBookingRepository;
import com.space.book.repository.search.EmailInBookingSearchRepository;
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

import com.space.book.domain.enumeration.EmailType;
/**
 * Test class for the EmailInBookingResource REST controller.
 *
 * @see EmailInBookingResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SpaceBookApp.class)
public class EmailInBookingResourceIntTest {

    private static final EmailType DEFAULT_EMAIL_TYPE = EmailType.TO;
    private static final EmailType UPDATED_EMAIL_TYPE = EmailType.FROM;

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    @Autowired
    private EmailInBookingRepository emailInBookingRepository;

    @Autowired
    private EmailInBookingSearchRepository emailInBookingSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restEmailInBookingMockMvc;

    private EmailInBooking emailInBooking;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EmailInBookingResource emailInBookingResource = new EmailInBookingResource(emailInBookingRepository, emailInBookingSearchRepository);
        this.restEmailInBookingMockMvc = MockMvcBuilders.standaloneSetup(emailInBookingResource)
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
    public static EmailInBooking createEntity(EntityManager em) {
        EmailInBooking emailInBooking = new EmailInBooking()
            .emailType(DEFAULT_EMAIL_TYPE)
            .email(DEFAULT_EMAIL);
        return emailInBooking;
    }

    @Before
    public void initTest() {
        emailInBookingSearchRepository.deleteAll();
        emailInBooking = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmailInBooking() throws Exception {
        int databaseSizeBeforeCreate = emailInBookingRepository.findAll().size();

        // Create the EmailInBooking
        restEmailInBookingMockMvc.perform(post("/api/email-in-bookings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emailInBooking)))
            .andExpect(status().isCreated());

        // Validate the EmailInBooking in the database
        List<EmailInBooking> emailInBookingList = emailInBookingRepository.findAll();
        assertThat(emailInBookingList).hasSize(databaseSizeBeforeCreate + 1);
        EmailInBooking testEmailInBooking = emailInBookingList.get(emailInBookingList.size() - 1);
        assertThat(testEmailInBooking.getEmailType()).isEqualTo(DEFAULT_EMAIL_TYPE);
        assertThat(testEmailInBooking.getEmail()).isEqualTo(DEFAULT_EMAIL);

        // Validate the EmailInBooking in Elasticsearch
        EmailInBooking emailInBookingEs = emailInBookingSearchRepository.findOne(testEmailInBooking.getId());
        assertThat(emailInBookingEs).isEqualToIgnoringGivenFields(testEmailInBooking);
    }

    @Test
    @Transactional
    public void createEmailInBookingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = emailInBookingRepository.findAll().size();

        // Create the EmailInBooking with an existing ID
        emailInBooking.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmailInBookingMockMvc.perform(post("/api/email-in-bookings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emailInBooking)))
            .andExpect(status().isBadRequest());

        // Validate the EmailInBooking in the database
        List<EmailInBooking> emailInBookingList = emailInBookingRepository.findAll();
        assertThat(emailInBookingList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkEmailTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = emailInBookingRepository.findAll().size();
        // set the field null
        emailInBooking.setEmailType(null);

        // Create the EmailInBooking, which fails.

        restEmailInBookingMockMvc.perform(post("/api/email-in-bookings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emailInBooking)))
            .andExpect(status().isBadRequest());

        List<EmailInBooking> emailInBookingList = emailInBookingRepository.findAll();
        assertThat(emailInBookingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = emailInBookingRepository.findAll().size();
        // set the field null
        emailInBooking.setEmail(null);

        // Create the EmailInBooking, which fails.

        restEmailInBookingMockMvc.perform(post("/api/email-in-bookings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emailInBooking)))
            .andExpect(status().isBadRequest());

        List<EmailInBooking> emailInBookingList = emailInBookingRepository.findAll();
        assertThat(emailInBookingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEmailInBookings() throws Exception {
        // Initialize the database
        emailInBookingRepository.saveAndFlush(emailInBooking);

        // Get all the emailInBookingList
        restEmailInBookingMockMvc.perform(get("/api/email-in-bookings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(emailInBooking.getId().intValue())))
            .andExpect(jsonPath("$.[*].emailType").value(hasItem(DEFAULT_EMAIL_TYPE.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())));
    }

    @Test
    @Transactional
    public void getEmailInBooking() throws Exception {
        // Initialize the database
        emailInBookingRepository.saveAndFlush(emailInBooking);

        // Get the emailInBooking
        restEmailInBookingMockMvc.perform(get("/api/email-in-bookings/{id}", emailInBooking.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(emailInBooking.getId().intValue()))
            .andExpect(jsonPath("$.emailType").value(DEFAULT_EMAIL_TYPE.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEmailInBooking() throws Exception {
        // Get the emailInBooking
        restEmailInBookingMockMvc.perform(get("/api/email-in-bookings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmailInBooking() throws Exception {
        // Initialize the database
        emailInBookingRepository.saveAndFlush(emailInBooking);
        emailInBookingSearchRepository.save(emailInBooking);
        int databaseSizeBeforeUpdate = emailInBookingRepository.findAll().size();

        // Update the emailInBooking
        EmailInBooking updatedEmailInBooking = emailInBookingRepository.findOne(emailInBooking.getId());
        // Disconnect from session so that the updates on updatedEmailInBooking are not directly saved in db
        em.detach(updatedEmailInBooking);
        updatedEmailInBooking
            .emailType(UPDATED_EMAIL_TYPE)
            .email(UPDATED_EMAIL);

        restEmailInBookingMockMvc.perform(put("/api/email-in-bookings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEmailInBooking)))
            .andExpect(status().isOk());

        // Validate the EmailInBooking in the database
        List<EmailInBooking> emailInBookingList = emailInBookingRepository.findAll();
        assertThat(emailInBookingList).hasSize(databaseSizeBeforeUpdate);
        EmailInBooking testEmailInBooking = emailInBookingList.get(emailInBookingList.size() - 1);
        assertThat(testEmailInBooking.getEmailType()).isEqualTo(UPDATED_EMAIL_TYPE);
        assertThat(testEmailInBooking.getEmail()).isEqualTo(UPDATED_EMAIL);

        // Validate the EmailInBooking in Elasticsearch
        EmailInBooking emailInBookingEs = emailInBookingSearchRepository.findOne(testEmailInBooking.getId());
        assertThat(emailInBookingEs).isEqualToIgnoringGivenFields(testEmailInBooking);
    }

    @Test
    @Transactional
    public void updateNonExistingEmailInBooking() throws Exception {
        int databaseSizeBeforeUpdate = emailInBookingRepository.findAll().size();

        // Create the EmailInBooking

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restEmailInBookingMockMvc.perform(put("/api/email-in-bookings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(emailInBooking)))
            .andExpect(status().isCreated());

        // Validate the EmailInBooking in the database
        List<EmailInBooking> emailInBookingList = emailInBookingRepository.findAll();
        assertThat(emailInBookingList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteEmailInBooking() throws Exception {
        // Initialize the database
        emailInBookingRepository.saveAndFlush(emailInBooking);
        emailInBookingSearchRepository.save(emailInBooking);
        int databaseSizeBeforeDelete = emailInBookingRepository.findAll().size();

        // Get the emailInBooking
        restEmailInBookingMockMvc.perform(delete("/api/email-in-bookings/{id}", emailInBooking.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean emailInBookingExistsInEs = emailInBookingSearchRepository.exists(emailInBooking.getId());
        assertThat(emailInBookingExistsInEs).isFalse();

        // Validate the database is empty
        List<EmailInBooking> emailInBookingList = emailInBookingRepository.findAll();
        assertThat(emailInBookingList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchEmailInBooking() throws Exception {
        // Initialize the database
        emailInBookingRepository.saveAndFlush(emailInBooking);
        emailInBookingSearchRepository.save(emailInBooking);

        // Search the emailInBooking
        restEmailInBookingMockMvc.perform(get("/api/_search/email-in-bookings?query=id:" + emailInBooking.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(emailInBooking.getId().intValue())))
            .andExpect(jsonPath("$.[*].emailType").value(hasItem(DEFAULT_EMAIL_TYPE.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EmailInBooking.class);
        EmailInBooking emailInBooking1 = new EmailInBooking();
        emailInBooking1.setId(1L);
        EmailInBooking emailInBooking2 = new EmailInBooking();
        emailInBooking2.setId(emailInBooking1.getId());
        assertThat(emailInBooking1).isEqualTo(emailInBooking2);
        emailInBooking2.setId(2L);
        assertThat(emailInBooking1).isNotEqualTo(emailInBooking2);
        emailInBooking1.setId(null);
        assertThat(emailInBooking1).isNotEqualTo(emailInBooking2);
    }
}
