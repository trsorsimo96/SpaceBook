package com.space.book.web.rest;

import com.space.book.SpaceBookApp;

import com.space.book.domain.AddressInBooking;
import com.space.book.repository.AddressInBookingRepository;
import com.space.book.repository.search.AddressInBookingSearchRepository;
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

import com.space.book.domain.enumeration.TypeAddress;
/**
 * Test class for the AddressInBookingResource REST controller.
 *
 * @see AddressInBookingResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = SpaceBookApp.class)
public class AddressInBookingResourceIntTest {

    private static final String DEFAULT_CUSTOMER_NAME = "AAAAAAAAAA";
    private static final String UPDATED_CUSTOMER_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_STREET_ADDRESS_1 = "AAAAAAAAAA";
    private static final String UPDATED_STREET_ADDRESS_1 = "BBBBBBBBBB";

    private static final String DEFAULT_STREET_ADDRESS_2 = "AAAAAAAAAA";
    private static final String UPDATED_STREET_ADDRESS_2 = "BBBBBBBBBB";

    private static final String DEFAULT_CITY = "AAAAAAAAAA";
    private static final String UPDATED_CITY = "BBBBBBBBBB";

    private static final String DEFAULT_STATE = "AAAAAAAAAA";
    private static final String UPDATED_STATE = "BBBBBBBBBB";

    private static final String DEFAULT_ZIP = "AAAAAAAAAA";
    private static final String UPDATED_ZIP = "BBBBBBBBBB";

    private static final TypeAddress DEFAULT_TYPE_ADDRESS = TypeAddress.CUSTOMER;
    private static final TypeAddress UPDATED_TYPE_ADDRESS = TypeAddress.DELIVERY;

    @Autowired
    private AddressInBookingRepository addressInBookingRepository;

    @Autowired
    private AddressInBookingSearchRepository addressInBookingSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAddressInBookingMockMvc;

    private AddressInBooking addressInBooking;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AddressInBookingResource addressInBookingResource = new AddressInBookingResource(addressInBookingRepository, addressInBookingSearchRepository);
        this.restAddressInBookingMockMvc = MockMvcBuilders.standaloneSetup(addressInBookingResource)
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
    public static AddressInBooking createEntity(EntityManager em) {
        AddressInBooking addressInBooking = new AddressInBooking()
            .customerName(DEFAULT_CUSTOMER_NAME)
            .streetAddress1(DEFAULT_STREET_ADDRESS_1)
            .streetAddress2(DEFAULT_STREET_ADDRESS_2)
            .city(DEFAULT_CITY)
            .state(DEFAULT_STATE)
            .zip(DEFAULT_ZIP)
            .typeAddress(DEFAULT_TYPE_ADDRESS);
        return addressInBooking;
    }

    @Before
    public void initTest() {
        addressInBookingSearchRepository.deleteAll();
        addressInBooking = createEntity(em);
    }

    @Test
    @Transactional
    public void createAddressInBooking() throws Exception {
        int databaseSizeBeforeCreate = addressInBookingRepository.findAll().size();

        // Create the AddressInBooking
        restAddressInBookingMockMvc.perform(post("/api/address-in-bookings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(addressInBooking)))
            .andExpect(status().isCreated());

        // Validate the AddressInBooking in the database
        List<AddressInBooking> addressInBookingList = addressInBookingRepository.findAll();
        assertThat(addressInBookingList).hasSize(databaseSizeBeforeCreate + 1);
        AddressInBooking testAddressInBooking = addressInBookingList.get(addressInBookingList.size() - 1);
        assertThat(testAddressInBooking.getCustomerName()).isEqualTo(DEFAULT_CUSTOMER_NAME);
        assertThat(testAddressInBooking.getStreetAddress1()).isEqualTo(DEFAULT_STREET_ADDRESS_1);
        assertThat(testAddressInBooking.getStreetAddress2()).isEqualTo(DEFAULT_STREET_ADDRESS_2);
        assertThat(testAddressInBooking.getCity()).isEqualTo(DEFAULT_CITY);
        assertThat(testAddressInBooking.getState()).isEqualTo(DEFAULT_STATE);
        assertThat(testAddressInBooking.getZip()).isEqualTo(DEFAULT_ZIP);
        assertThat(testAddressInBooking.getTypeAddress()).isEqualTo(DEFAULT_TYPE_ADDRESS);

        // Validate the AddressInBooking in Elasticsearch
        AddressInBooking addressInBookingEs = addressInBookingSearchRepository.findOne(testAddressInBooking.getId());
        assertThat(addressInBookingEs).isEqualToIgnoringGivenFields(testAddressInBooking);
    }

    @Test
    @Transactional
    public void createAddressInBookingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = addressInBookingRepository.findAll().size();

        // Create the AddressInBooking with an existing ID
        addressInBooking.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAddressInBookingMockMvc.perform(post("/api/address-in-bookings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(addressInBooking)))
            .andExpect(status().isBadRequest());

        // Validate the AddressInBooking in the database
        List<AddressInBooking> addressInBookingList = addressInBookingRepository.findAll();
        assertThat(addressInBookingList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCustomerNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = addressInBookingRepository.findAll().size();
        // set the field null
        addressInBooking.setCustomerName(null);

        // Create the AddressInBooking, which fails.

        restAddressInBookingMockMvc.perform(post("/api/address-in-bookings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(addressInBooking)))
            .andExpect(status().isBadRequest());

        List<AddressInBooking> addressInBookingList = addressInBookingRepository.findAll();
        assertThat(addressInBookingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStreetAddress1IsRequired() throws Exception {
        int databaseSizeBeforeTest = addressInBookingRepository.findAll().size();
        // set the field null
        addressInBooking.setStreetAddress1(null);

        // Create the AddressInBooking, which fails.

        restAddressInBookingMockMvc.perform(post("/api/address-in-bookings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(addressInBooking)))
            .andExpect(status().isBadRequest());

        List<AddressInBooking> addressInBookingList = addressInBookingRepository.findAll();
        assertThat(addressInBookingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCityIsRequired() throws Exception {
        int databaseSizeBeforeTest = addressInBookingRepository.findAll().size();
        // set the field null
        addressInBooking.setCity(null);

        // Create the AddressInBooking, which fails.

        restAddressInBookingMockMvc.perform(post("/api/address-in-bookings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(addressInBooking)))
            .andExpect(status().isBadRequest());

        List<AddressInBooking> addressInBookingList = addressInBookingRepository.findAll();
        assertThat(addressInBookingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkZipIsRequired() throws Exception {
        int databaseSizeBeforeTest = addressInBookingRepository.findAll().size();
        // set the field null
        addressInBooking.setZip(null);

        // Create the AddressInBooking, which fails.

        restAddressInBookingMockMvc.perform(post("/api/address-in-bookings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(addressInBooking)))
            .andExpect(status().isBadRequest());

        List<AddressInBooking> addressInBookingList = addressInBookingRepository.findAll();
        assertThat(addressInBookingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAddressInBookings() throws Exception {
        // Initialize the database
        addressInBookingRepository.saveAndFlush(addressInBooking);

        // Get all the addressInBookingList
        restAddressInBookingMockMvc.perform(get("/api/address-in-bookings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(addressInBooking.getId().intValue())))
            .andExpect(jsonPath("$.[*].customerName").value(hasItem(DEFAULT_CUSTOMER_NAME.toString())))
            .andExpect(jsonPath("$.[*].streetAddress1").value(hasItem(DEFAULT_STREET_ADDRESS_1.toString())))
            .andExpect(jsonPath("$.[*].streetAddress2").value(hasItem(DEFAULT_STREET_ADDRESS_2.toString())))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY.toString())))
            .andExpect(jsonPath("$.[*].state").value(hasItem(DEFAULT_STATE.toString())))
            .andExpect(jsonPath("$.[*].zip").value(hasItem(DEFAULT_ZIP.toString())))
            .andExpect(jsonPath("$.[*].typeAddress").value(hasItem(DEFAULT_TYPE_ADDRESS.toString())));
    }

    @Test
    @Transactional
    public void getAddressInBooking() throws Exception {
        // Initialize the database
        addressInBookingRepository.saveAndFlush(addressInBooking);

        // Get the addressInBooking
        restAddressInBookingMockMvc.perform(get("/api/address-in-bookings/{id}", addressInBooking.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(addressInBooking.getId().intValue()))
            .andExpect(jsonPath("$.customerName").value(DEFAULT_CUSTOMER_NAME.toString()))
            .andExpect(jsonPath("$.streetAddress1").value(DEFAULT_STREET_ADDRESS_1.toString()))
            .andExpect(jsonPath("$.streetAddress2").value(DEFAULT_STREET_ADDRESS_2.toString()))
            .andExpect(jsonPath("$.city").value(DEFAULT_CITY.toString()))
            .andExpect(jsonPath("$.state").value(DEFAULT_STATE.toString()))
            .andExpect(jsonPath("$.zip").value(DEFAULT_ZIP.toString()))
            .andExpect(jsonPath("$.typeAddress").value(DEFAULT_TYPE_ADDRESS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAddressInBooking() throws Exception {
        // Get the addressInBooking
        restAddressInBookingMockMvc.perform(get("/api/address-in-bookings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAddressInBooking() throws Exception {
        // Initialize the database
        addressInBookingRepository.saveAndFlush(addressInBooking);
        addressInBookingSearchRepository.save(addressInBooking);
        int databaseSizeBeforeUpdate = addressInBookingRepository.findAll().size();

        // Update the addressInBooking
        AddressInBooking updatedAddressInBooking = addressInBookingRepository.findOne(addressInBooking.getId());
        // Disconnect from session so that the updates on updatedAddressInBooking are not directly saved in db
        em.detach(updatedAddressInBooking);
        updatedAddressInBooking
            .customerName(UPDATED_CUSTOMER_NAME)
            .streetAddress1(UPDATED_STREET_ADDRESS_1)
            .streetAddress2(UPDATED_STREET_ADDRESS_2)
            .city(UPDATED_CITY)
            .state(UPDATED_STATE)
            .zip(UPDATED_ZIP)
            .typeAddress(UPDATED_TYPE_ADDRESS);

        restAddressInBookingMockMvc.perform(put("/api/address-in-bookings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAddressInBooking)))
            .andExpect(status().isOk());

        // Validate the AddressInBooking in the database
        List<AddressInBooking> addressInBookingList = addressInBookingRepository.findAll();
        assertThat(addressInBookingList).hasSize(databaseSizeBeforeUpdate);
        AddressInBooking testAddressInBooking = addressInBookingList.get(addressInBookingList.size() - 1);
        assertThat(testAddressInBooking.getCustomerName()).isEqualTo(UPDATED_CUSTOMER_NAME);
        assertThat(testAddressInBooking.getStreetAddress1()).isEqualTo(UPDATED_STREET_ADDRESS_1);
        assertThat(testAddressInBooking.getStreetAddress2()).isEqualTo(UPDATED_STREET_ADDRESS_2);
        assertThat(testAddressInBooking.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testAddressInBooking.getState()).isEqualTo(UPDATED_STATE);
        assertThat(testAddressInBooking.getZip()).isEqualTo(UPDATED_ZIP);
        assertThat(testAddressInBooking.getTypeAddress()).isEqualTo(UPDATED_TYPE_ADDRESS);

        // Validate the AddressInBooking in Elasticsearch
        AddressInBooking addressInBookingEs = addressInBookingSearchRepository.findOne(testAddressInBooking.getId());
        assertThat(addressInBookingEs).isEqualToIgnoringGivenFields(testAddressInBooking);
    }

    @Test
    @Transactional
    public void updateNonExistingAddressInBooking() throws Exception {
        int databaseSizeBeforeUpdate = addressInBookingRepository.findAll().size();

        // Create the AddressInBooking

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAddressInBookingMockMvc.perform(put("/api/address-in-bookings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(addressInBooking)))
            .andExpect(status().isCreated());

        // Validate the AddressInBooking in the database
        List<AddressInBooking> addressInBookingList = addressInBookingRepository.findAll();
        assertThat(addressInBookingList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAddressInBooking() throws Exception {
        // Initialize the database
        addressInBookingRepository.saveAndFlush(addressInBooking);
        addressInBookingSearchRepository.save(addressInBooking);
        int databaseSizeBeforeDelete = addressInBookingRepository.findAll().size();

        // Get the addressInBooking
        restAddressInBookingMockMvc.perform(delete("/api/address-in-bookings/{id}", addressInBooking.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean addressInBookingExistsInEs = addressInBookingSearchRepository.exists(addressInBooking.getId());
        assertThat(addressInBookingExistsInEs).isFalse();

        // Validate the database is empty
        List<AddressInBooking> addressInBookingList = addressInBookingRepository.findAll();
        assertThat(addressInBookingList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchAddressInBooking() throws Exception {
        // Initialize the database
        addressInBookingRepository.saveAndFlush(addressInBooking);
        addressInBookingSearchRepository.save(addressInBooking);

        // Search the addressInBooking
        restAddressInBookingMockMvc.perform(get("/api/_search/address-in-bookings?query=id:" + addressInBooking.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(addressInBooking.getId().intValue())))
            .andExpect(jsonPath("$.[*].customerName").value(hasItem(DEFAULT_CUSTOMER_NAME.toString())))
            .andExpect(jsonPath("$.[*].streetAddress1").value(hasItem(DEFAULT_STREET_ADDRESS_1.toString())))
            .andExpect(jsonPath("$.[*].streetAddress2").value(hasItem(DEFAULT_STREET_ADDRESS_2.toString())))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY.toString())))
            .andExpect(jsonPath("$.[*].state").value(hasItem(DEFAULT_STATE.toString())))
            .andExpect(jsonPath("$.[*].zip").value(hasItem(DEFAULT_ZIP.toString())))
            .andExpect(jsonPath("$.[*].typeAddress").value(hasItem(DEFAULT_TYPE_ADDRESS.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AddressInBooking.class);
        AddressInBooking addressInBooking1 = new AddressInBooking();
        addressInBooking1.setId(1L);
        AddressInBooking addressInBooking2 = new AddressInBooking();
        addressInBooking2.setId(addressInBooking1.getId());
        assertThat(addressInBooking1).isEqualTo(addressInBooking2);
        addressInBooking2.setId(2L);
        assertThat(addressInBooking1).isNotEqualTo(addressInBooking2);
        addressInBooking1.setId(null);
        assertThat(addressInBooking1).isNotEqualTo(addressInBooking2);
    }
}
