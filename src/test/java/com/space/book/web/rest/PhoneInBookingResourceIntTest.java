package com.space.book.web.rest;

import com.space.book.SpaceBookApp;

import com.space.book.domain.PhoneInBooking;
import com.space.book.repository.PhoneInBookingRepository;
import com.space.book.repository.search.PhoneInBookingSearchRepository;
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

import com.space.book.domain.enumeration.PhoneType;
/**
 * Test class for the PhoneInBookingResource REST controller.
 *
 * @see PhoneInBookingResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SpaceBookApp.class)
public class PhoneInBookingResourceIntTest {

    private static final PhoneType DEFAULT_PHONE_TYPE = PhoneType.ACCOMODATION;
    private static final PhoneType UPDATED_PHONE_TYPE = PhoneType.AGENCY;

    private static final String DEFAULT_NUMBER = "AAAAAAAAAA";
    private static final String UPDATED_NUMBER = "BBBBBBBBBB";

    @Autowired
    private PhoneInBookingRepository phoneInBookingRepository;

    @Autowired
    private PhoneInBookingSearchRepository phoneInBookingSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restPhoneInBookingMockMvc;

    private PhoneInBooking phoneInBooking;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PhoneInBookingResource phoneInBookingResource = new PhoneInBookingResource(phoneInBookingRepository, phoneInBookingSearchRepository);
        this.restPhoneInBookingMockMvc = MockMvcBuilders.standaloneSetup(phoneInBookingResource)
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
    public static PhoneInBooking createEntity(EntityManager em) {
        PhoneInBooking phoneInBooking = new PhoneInBooking()
            .phoneType(DEFAULT_PHONE_TYPE)
            .number(DEFAULT_NUMBER);
        return phoneInBooking;
    }

    @Before
    public void initTest() {
        phoneInBookingSearchRepository.deleteAll();
        phoneInBooking = createEntity(em);
    }

    @Test
    @Transactional
    public void createPhoneInBooking() throws Exception {
        int databaseSizeBeforeCreate = phoneInBookingRepository.findAll().size();

        // Create the PhoneInBooking
        restPhoneInBookingMockMvc.perform(post("/api/phone-in-bookings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(phoneInBooking)))
            .andExpect(status().isCreated());

        // Validate the PhoneInBooking in the database
        List<PhoneInBooking> phoneInBookingList = phoneInBookingRepository.findAll();
        assertThat(phoneInBookingList).hasSize(databaseSizeBeforeCreate + 1);
        PhoneInBooking testPhoneInBooking = phoneInBookingList.get(phoneInBookingList.size() - 1);
        assertThat(testPhoneInBooking.getPhoneType()).isEqualTo(DEFAULT_PHONE_TYPE);
        assertThat(testPhoneInBooking.getNumber()).isEqualTo(DEFAULT_NUMBER);

        // Validate the PhoneInBooking in Elasticsearch
        PhoneInBooking phoneInBookingEs = phoneInBookingSearchRepository.findOne(testPhoneInBooking.getId());
        assertThat(phoneInBookingEs).isEqualToIgnoringGivenFields(testPhoneInBooking);
    }

    @Test
    @Transactional
    public void createPhoneInBookingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = phoneInBookingRepository.findAll().size();

        // Create the PhoneInBooking with an existing ID
        phoneInBooking.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPhoneInBookingMockMvc.perform(post("/api/phone-in-bookings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(phoneInBooking)))
            .andExpect(status().isBadRequest());

        // Validate the PhoneInBooking in the database
        List<PhoneInBooking> phoneInBookingList = phoneInBookingRepository.findAll();
        assertThat(phoneInBookingList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkPhoneTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = phoneInBookingRepository.findAll().size();
        // set the field null
        phoneInBooking.setPhoneType(null);

        // Create the PhoneInBooking, which fails.

        restPhoneInBookingMockMvc.perform(post("/api/phone-in-bookings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(phoneInBooking)))
            .andExpect(status().isBadRequest());

        List<PhoneInBooking> phoneInBookingList = phoneInBookingRepository.findAll();
        assertThat(phoneInBookingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkNumberIsRequired() throws Exception {
        int databaseSizeBeforeTest = phoneInBookingRepository.findAll().size();
        // set the field null
        phoneInBooking.setNumber(null);

        // Create the PhoneInBooking, which fails.

        restPhoneInBookingMockMvc.perform(post("/api/phone-in-bookings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(phoneInBooking)))
            .andExpect(status().isBadRequest());

        List<PhoneInBooking> phoneInBookingList = phoneInBookingRepository.findAll();
        assertThat(phoneInBookingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPhoneInBookings() throws Exception {
        // Initialize the database
        phoneInBookingRepository.saveAndFlush(phoneInBooking);

        // Get all the phoneInBookingList
        restPhoneInBookingMockMvc.perform(get("/api/phone-in-bookings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(phoneInBooking.getId().intValue())))
            .andExpect(jsonPath("$.[*].phoneType").value(hasItem(DEFAULT_PHONE_TYPE.toString())))
            .andExpect(jsonPath("$.[*].number").value(hasItem(DEFAULT_NUMBER.toString())));
    }

    @Test
    @Transactional
    public void getPhoneInBooking() throws Exception {
        // Initialize the database
        phoneInBookingRepository.saveAndFlush(phoneInBooking);

        // Get the phoneInBooking
        restPhoneInBookingMockMvc.perform(get("/api/phone-in-bookings/{id}", phoneInBooking.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(phoneInBooking.getId().intValue()))
            .andExpect(jsonPath("$.phoneType").value(DEFAULT_PHONE_TYPE.toString()))
            .andExpect(jsonPath("$.number").value(DEFAULT_NUMBER.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPhoneInBooking() throws Exception {
        // Get the phoneInBooking
        restPhoneInBookingMockMvc.perform(get("/api/phone-in-bookings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePhoneInBooking() throws Exception {
        // Initialize the database
        phoneInBookingRepository.saveAndFlush(phoneInBooking);
        phoneInBookingSearchRepository.save(phoneInBooking);
        int databaseSizeBeforeUpdate = phoneInBookingRepository.findAll().size();

        // Update the phoneInBooking
        PhoneInBooking updatedPhoneInBooking = phoneInBookingRepository.findOne(phoneInBooking.getId());
        // Disconnect from session so that the updates on updatedPhoneInBooking are not directly saved in db
        em.detach(updatedPhoneInBooking);
        updatedPhoneInBooking
            .phoneType(UPDATED_PHONE_TYPE)
            .number(UPDATED_NUMBER);

        restPhoneInBookingMockMvc.perform(put("/api/phone-in-bookings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPhoneInBooking)))
            .andExpect(status().isOk());

        // Validate the PhoneInBooking in the database
        List<PhoneInBooking> phoneInBookingList = phoneInBookingRepository.findAll();
        assertThat(phoneInBookingList).hasSize(databaseSizeBeforeUpdate);
        PhoneInBooking testPhoneInBooking = phoneInBookingList.get(phoneInBookingList.size() - 1);
        assertThat(testPhoneInBooking.getPhoneType()).isEqualTo(UPDATED_PHONE_TYPE);
        assertThat(testPhoneInBooking.getNumber()).isEqualTo(UPDATED_NUMBER);

        // Validate the PhoneInBooking in Elasticsearch
        PhoneInBooking phoneInBookingEs = phoneInBookingSearchRepository.findOne(testPhoneInBooking.getId());
        assertThat(phoneInBookingEs).isEqualToIgnoringGivenFields(testPhoneInBooking);
    }

    @Test
    @Transactional
    public void updateNonExistingPhoneInBooking() throws Exception {
        int databaseSizeBeforeUpdate = phoneInBookingRepository.findAll().size();

        // Create the PhoneInBooking

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restPhoneInBookingMockMvc.perform(put("/api/phone-in-bookings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(phoneInBooking)))
            .andExpect(status().isCreated());

        // Validate the PhoneInBooking in the database
        List<PhoneInBooking> phoneInBookingList = phoneInBookingRepository.findAll();
        assertThat(phoneInBookingList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deletePhoneInBooking() throws Exception {
        // Initialize the database
        phoneInBookingRepository.saveAndFlush(phoneInBooking);
        phoneInBookingSearchRepository.save(phoneInBooking);
        int databaseSizeBeforeDelete = phoneInBookingRepository.findAll().size();

        // Get the phoneInBooking
        restPhoneInBookingMockMvc.perform(delete("/api/phone-in-bookings/{id}", phoneInBooking.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean phoneInBookingExistsInEs = phoneInBookingSearchRepository.exists(phoneInBooking.getId());
        assertThat(phoneInBookingExistsInEs).isFalse();

        // Validate the database is empty
        List<PhoneInBooking> phoneInBookingList = phoneInBookingRepository.findAll();
        assertThat(phoneInBookingList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchPhoneInBooking() throws Exception {
        // Initialize the database
        phoneInBookingRepository.saveAndFlush(phoneInBooking);
        phoneInBookingSearchRepository.save(phoneInBooking);

        // Search the phoneInBooking
        restPhoneInBookingMockMvc.perform(get("/api/_search/phone-in-bookings?query=id:" + phoneInBooking.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(phoneInBooking.getId().intValue())))
            .andExpect(jsonPath("$.[*].phoneType").value(hasItem(DEFAULT_PHONE_TYPE.toString())))
            .andExpect(jsonPath("$.[*].number").value(hasItem(DEFAULT_NUMBER.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PhoneInBooking.class);
        PhoneInBooking phoneInBooking1 = new PhoneInBooking();
        phoneInBooking1.setId(1L);
        PhoneInBooking phoneInBooking2 = new PhoneInBooking();
        phoneInBooking2.setId(phoneInBooking1.getId());
        assertThat(phoneInBooking1).isEqualTo(phoneInBooking2);
        phoneInBooking2.setId(2L);
        assertThat(phoneInBooking1).isNotEqualTo(phoneInBooking2);
        phoneInBooking1.setId(null);
        assertThat(phoneInBooking1).isNotEqualTo(phoneInBooking2);
    }
}
