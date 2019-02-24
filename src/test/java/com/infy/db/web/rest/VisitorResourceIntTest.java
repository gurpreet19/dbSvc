package com.infy.db.web.rest;

import com.infy.db.DbSvcApp;

import com.infy.db.domain.Visitor;
import com.infy.db.domain.Employee;
import com.infy.db.repository.VisitorRepository;
import com.infy.db.service.VisitorService;
import com.infy.db.web.rest.errors.ExceptionTranslator;

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
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;


import static com.infy.db.web.rest.TestUtil.sameInstant;
import static com.infy.db.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.infy.db.domain.enumeration.VisitorType;
/**
 * Test class for the VisitorResource REST controller.
 *
 * @see VisitorResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DbSvcApp.class)
public class VisitorResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_VISITOR_ID = 1;
    private static final Integer UPDATED_VISITOR_ID = 2;

    private static final VisitorType DEFAULT_TYPE = VisitorType.NEWJOINEE;
    private static final VisitorType UPDATED_TYPE = VisitorType.EMPLOYEE;

    private static final ZonedDateTime DEFAULT_ALLOWED_FROM = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_ALLOWED_FROM = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_ALLOWED_TO = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_ALLOWED_TO = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final String DEFAULT_LOCATION = "AAAAAAAAAA";
    private static final String UPDATED_LOCATION = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final Integer DEFAULT_PHONE = 1000000000;
    private static final Integer UPDATED_PHONE = 1000000001;

    private static final Boolean DEFAULT_STATUS = false;
    private static final Boolean UPDATED_STATUS = true;

    private static final String DEFAULT_QR_STRING = "AAAAAAAAAA";
    private static final String UPDATED_QR_STRING = "BBBBBBBBBB";

    @Autowired
    private VisitorRepository visitorRepository;

    @Autowired
    private VisitorService visitorService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restVisitorMockMvc;

    private Visitor visitor;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final VisitorResource visitorResource = new VisitorResource(visitorService);
        this.restVisitorMockMvc = MockMvcBuilders.standaloneSetup(visitorResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Visitor createEntity(EntityManager em) {
        Visitor visitor = new Visitor()
            .name(DEFAULT_NAME)
            .visitorId(DEFAULT_VISITOR_ID)
            .type(DEFAULT_TYPE)
            .allowedFrom(DEFAULT_ALLOWED_FROM)
            .allowedTo(DEFAULT_ALLOWED_TO)
            .location(DEFAULT_LOCATION)
            .email(DEFAULT_EMAIL)
            .phone(DEFAULT_PHONE)
            .status(DEFAULT_STATUS)
            .qrString(DEFAULT_QR_STRING);
        // Add required entity
        Employee employee = EmployeeResourceIntTest.createEntity(em);
        em.persist(employee);
        em.flush();
        visitor.setEmployee(employee);
        return visitor;
    }

    @Before
    public void initTest() {
        visitor = createEntity(em);
    }

    @Test
    @Transactional
    public void createVisitor() throws Exception {
        int databaseSizeBeforeCreate = visitorRepository.findAll().size();

        // Create the Visitor
        restVisitorMockMvc.perform(post("/api/visitors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(visitor)))
            .andExpect(status().isCreated());

        // Validate the Visitor in the database
        List<Visitor> visitorList = visitorRepository.findAll();
        assertThat(visitorList).hasSize(databaseSizeBeforeCreate + 1);
        Visitor testVisitor = visitorList.get(visitorList.size() - 1);
        assertThat(testVisitor.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testVisitor.getVisitorId()).isEqualTo(DEFAULT_VISITOR_ID);
        assertThat(testVisitor.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testVisitor.getAllowedFrom()).isEqualTo(DEFAULT_ALLOWED_FROM);
        assertThat(testVisitor.getAllowedTo()).isEqualTo(DEFAULT_ALLOWED_TO);
        assertThat(testVisitor.getLocation()).isEqualTo(DEFAULT_LOCATION);
        assertThat(testVisitor.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testVisitor.getPhone()).isEqualTo(DEFAULT_PHONE);
        assertThat(testVisitor.isStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testVisitor.getQrString()).isEqualTo(DEFAULT_QR_STRING);
    }

    @Test
    @Transactional
    public void createVisitorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = visitorRepository.findAll().size();

        // Create the Visitor with an existing ID
        visitor.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restVisitorMockMvc.perform(post("/api/visitors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(visitor)))
            .andExpect(status().isBadRequest());

        // Validate the Visitor in the database
        List<Visitor> visitorList = visitorRepository.findAll();
        assertThat(visitorList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = visitorRepository.findAll().size();
        // set the field null
        visitor.setName(null);

        // Create the Visitor, which fails.

        restVisitorMockMvc.perform(post("/api/visitors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(visitor)))
            .andExpect(status().isBadRequest());

        List<Visitor> visitorList = visitorRepository.findAll();
        assertThat(visitorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkVisitorIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = visitorRepository.findAll().size();
        // set the field null
        visitor.setVisitorId(null);

        // Create the Visitor, which fails.

        restVisitorMockMvc.perform(post("/api/visitors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(visitor)))
            .andExpect(status().isBadRequest());

        List<Visitor> visitorList = visitorRepository.findAll();
        assertThat(visitorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = visitorRepository.findAll().size();
        // set the field null
        visitor.setType(null);

        // Create the Visitor, which fails.

        restVisitorMockMvc.perform(post("/api/visitors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(visitor)))
            .andExpect(status().isBadRequest());

        List<Visitor> visitorList = visitorRepository.findAll();
        assertThat(visitorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAllowedFromIsRequired() throws Exception {
        int databaseSizeBeforeTest = visitorRepository.findAll().size();
        // set the field null
        visitor.setAllowedFrom(null);

        // Create the Visitor, which fails.

        restVisitorMockMvc.perform(post("/api/visitors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(visitor)))
            .andExpect(status().isBadRequest());

        List<Visitor> visitorList = visitorRepository.findAll();
        assertThat(visitorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAllowedToIsRequired() throws Exception {
        int databaseSizeBeforeTest = visitorRepository.findAll().size();
        // set the field null
        visitor.setAllowedTo(null);

        // Create the Visitor, which fails.

        restVisitorMockMvc.perform(post("/api/visitors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(visitor)))
            .andExpect(status().isBadRequest());

        List<Visitor> visitorList = visitorRepository.findAll();
        assertThat(visitorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkLocationIsRequired() throws Exception {
        int databaseSizeBeforeTest = visitorRepository.findAll().size();
        // set the field null
        visitor.setLocation(null);

        // Create the Visitor, which fails.

        restVisitorMockMvc.perform(post("/api/visitors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(visitor)))
            .andExpect(status().isBadRequest());

        List<Visitor> visitorList = visitorRepository.findAll();
        assertThat(visitorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = visitorRepository.findAll().size();
        // set the field null
        visitor.setEmail(null);

        // Create the Visitor, which fails.

        restVisitorMockMvc.perform(post("/api/visitors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(visitor)))
            .andExpect(status().isBadRequest());

        List<Visitor> visitorList = visitorRepository.findAll();
        assertThat(visitorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPhoneIsRequired() throws Exception {
        int databaseSizeBeforeTest = visitorRepository.findAll().size();
        // set the field null
        visitor.setPhone(null);

        // Create the Visitor, which fails.

        restVisitorMockMvc.perform(post("/api/visitors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(visitor)))
            .andExpect(status().isBadRequest());

        List<Visitor> visitorList = visitorRepository.findAll();
        assertThat(visitorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStatusIsRequired() throws Exception {
        int databaseSizeBeforeTest = visitorRepository.findAll().size();
        // set the field null
        visitor.setStatus(null);

        // Create the Visitor, which fails.

        restVisitorMockMvc.perform(post("/api/visitors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(visitor)))
            .andExpect(status().isBadRequest());

        List<Visitor> visitorList = visitorRepository.findAll();
        assertThat(visitorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkQrStringIsRequired() throws Exception {
        int databaseSizeBeforeTest = visitorRepository.findAll().size();
        // set the field null
        visitor.setQrString(null);

        // Create the Visitor, which fails.

        restVisitorMockMvc.perform(post("/api/visitors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(visitor)))
            .andExpect(status().isBadRequest());

        List<Visitor> visitorList = visitorRepository.findAll();
        assertThat(visitorList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllVisitors() throws Exception {
        // Initialize the database
        visitorRepository.saveAndFlush(visitor);

        // Get all the visitorList
        restVisitorMockMvc.perform(get("/api/visitors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(visitor.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].visitorId").value(hasItem(DEFAULT_VISITOR_ID)))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].allowedFrom").value(hasItem(sameInstant(DEFAULT_ALLOWED_FROM))))
            .andExpect(jsonPath("$.[*].allowedTo").value(hasItem(sameInstant(DEFAULT_ALLOWED_TO))))
            .andExpect(jsonPath("$.[*].location").value(hasItem(DEFAULT_LOCATION.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].phone").value(hasItem(DEFAULT_PHONE)))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS.booleanValue())))
            .andExpect(jsonPath("$.[*].qrString").value(hasItem(DEFAULT_QR_STRING.toString())));
    }
    
    @Test
    @Transactional
    public void getVisitor() throws Exception {
        // Initialize the database
        visitorRepository.saveAndFlush(visitor);

        // Get the visitor
        restVisitorMockMvc.perform(get("/api/visitors/{id}", visitor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(visitor.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.visitorId").value(DEFAULT_VISITOR_ID))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.allowedFrom").value(sameInstant(DEFAULT_ALLOWED_FROM)))
            .andExpect(jsonPath("$.allowedTo").value(sameInstant(DEFAULT_ALLOWED_TO)))
            .andExpect(jsonPath("$.location").value(DEFAULT_LOCATION.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.phone").value(DEFAULT_PHONE))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS.booleanValue()))
            .andExpect(jsonPath("$.qrString").value(DEFAULT_QR_STRING.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingVisitor() throws Exception {
        // Get the visitor
        restVisitorMockMvc.perform(get("/api/visitors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateVisitor() throws Exception {
        // Initialize the database
        visitorService.save(visitor);

        int databaseSizeBeforeUpdate = visitorRepository.findAll().size();

        // Update the visitor
        Visitor updatedVisitor = visitorRepository.findById(visitor.getId()).get();
        // Disconnect from session so that the updates on updatedVisitor are not directly saved in db
        em.detach(updatedVisitor);
        updatedVisitor
            .name(UPDATED_NAME)
            .visitorId(UPDATED_VISITOR_ID)
            .type(UPDATED_TYPE)
            .allowedFrom(UPDATED_ALLOWED_FROM)
            .allowedTo(UPDATED_ALLOWED_TO)
            .location(UPDATED_LOCATION)
            .email(UPDATED_EMAIL)
            .phone(UPDATED_PHONE)
            .status(UPDATED_STATUS)
            .qrString(UPDATED_QR_STRING);

        restVisitorMockMvc.perform(put("/api/visitors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedVisitor)))
            .andExpect(status().isOk());

        // Validate the Visitor in the database
        List<Visitor> visitorList = visitorRepository.findAll();
        assertThat(visitorList).hasSize(databaseSizeBeforeUpdate);
        Visitor testVisitor = visitorList.get(visitorList.size() - 1);
        assertThat(testVisitor.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testVisitor.getVisitorId()).isEqualTo(UPDATED_VISITOR_ID);
        assertThat(testVisitor.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testVisitor.getAllowedFrom()).isEqualTo(UPDATED_ALLOWED_FROM);
        assertThat(testVisitor.getAllowedTo()).isEqualTo(UPDATED_ALLOWED_TO);
        assertThat(testVisitor.getLocation()).isEqualTo(UPDATED_LOCATION);
        assertThat(testVisitor.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testVisitor.getPhone()).isEqualTo(UPDATED_PHONE);
        assertThat(testVisitor.isStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testVisitor.getQrString()).isEqualTo(UPDATED_QR_STRING);
    }

    @Test
    @Transactional
    public void updateNonExistingVisitor() throws Exception {
        int databaseSizeBeforeUpdate = visitorRepository.findAll().size();

        // Create the Visitor

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVisitorMockMvc.perform(put("/api/visitors")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(visitor)))
            .andExpect(status().isBadRequest());

        // Validate the Visitor in the database
        List<Visitor> visitorList = visitorRepository.findAll();
        assertThat(visitorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteVisitor() throws Exception {
        // Initialize the database
        visitorService.save(visitor);

        int databaseSizeBeforeDelete = visitorRepository.findAll().size();

        // Get the visitor
        restVisitorMockMvc.perform(delete("/api/visitors/{id}", visitor.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Visitor> visitorList = visitorRepository.findAll();
        assertThat(visitorList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Visitor.class);
        Visitor visitor1 = new Visitor();
        visitor1.setId(1L);
        Visitor visitor2 = new Visitor();
        visitor2.setId(visitor1.getId());
        assertThat(visitor1).isEqualTo(visitor2);
        visitor2.setId(2L);
        assertThat(visitor1).isNotEqualTo(visitor2);
        visitor1.setId(null);
        assertThat(visitor1).isNotEqualTo(visitor2);
    }
}
