package com.infy.db.web.rest;

import com.infy.db.DbSvcApp;

import com.infy.db.domain.Movement;
import com.infy.db.domain.Visitor;
import com.infy.db.repository.MovementRepository;
import com.infy.db.service.MovementService;
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

import com.infy.db.domain.enumeration.Type;
/**
 * Test class for the MovementResource REST controller.
 *
 * @see MovementResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DbSvcApp.class)
public class MovementResourceIntTest {

    private static final String DEFAULT_LOCATION = "AAAAAAAAAA";
    private static final String UPDATED_LOCATION = "BBBBBBBBBB";

    private static final Type DEFAULT_TYPE = Type.IN;
    private static final Type UPDATED_TYPE = Type.OUT;

    private static final ZonedDateTime DEFAULT_TIME_STAMP = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_TIME_STAMP = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private MovementRepository movementRepository;

    @Autowired
    private MovementService movementService;

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

    private MockMvc restMovementMockMvc;

    private Movement movement;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MovementResource movementResource = new MovementResource(movementService);
        this.restMovementMockMvc = MockMvcBuilders.standaloneSetup(movementResource)
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
    public static Movement createEntity(EntityManager em) {
        Movement movement = new Movement()
            .location(DEFAULT_LOCATION)
            .type(DEFAULT_TYPE)
            .timeStamp(DEFAULT_TIME_STAMP);
        // Add required entity
        Visitor visitor = VisitorResourceIntTest.createEntity(em);
        em.persist(visitor);
        em.flush();
        movement.setVisitor(visitor);
        return movement;
    }

    @Before
    public void initTest() {
        movement = createEntity(em);
    }

    @Test
    @Transactional
    public void createMovement() throws Exception {
        int databaseSizeBeforeCreate = movementRepository.findAll().size();

        // Create the Movement
        restMovementMockMvc.perform(post("/api/movements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(movement)))
            .andExpect(status().isCreated());

        // Validate the Movement in the database
        List<Movement> movementList = movementRepository.findAll();
        assertThat(movementList).hasSize(databaseSizeBeforeCreate + 1);
        Movement testMovement = movementList.get(movementList.size() - 1);
        assertThat(testMovement.getLocation()).isEqualTo(DEFAULT_LOCATION);
        assertThat(testMovement.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testMovement.getTimeStamp()).isEqualTo(DEFAULT_TIME_STAMP);
    }

    @Test
    @Transactional
    public void createMovementWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = movementRepository.findAll().size();

        // Create the Movement with an existing ID
        movement.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMovementMockMvc.perform(post("/api/movements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(movement)))
            .andExpect(status().isBadRequest());

        // Validate the Movement in the database
        List<Movement> movementList = movementRepository.findAll();
        assertThat(movementList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkLocationIsRequired() throws Exception {
        int databaseSizeBeforeTest = movementRepository.findAll().size();
        // set the field null
        movement.setLocation(null);

        // Create the Movement, which fails.

        restMovementMockMvc.perform(post("/api/movements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(movement)))
            .andExpect(status().isBadRequest());

        List<Movement> movementList = movementRepository.findAll();
        assertThat(movementList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = movementRepository.findAll().size();
        // set the field null
        movement.setType(null);

        // Create the Movement, which fails.

        restMovementMockMvc.perform(post("/api/movements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(movement)))
            .andExpect(status().isBadRequest());

        List<Movement> movementList = movementRepository.findAll();
        assertThat(movementList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkTimeStampIsRequired() throws Exception {
        int databaseSizeBeforeTest = movementRepository.findAll().size();
        // set the field null
        movement.setTimeStamp(null);

        // Create the Movement, which fails.

        restMovementMockMvc.perform(post("/api/movements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(movement)))
            .andExpect(status().isBadRequest());

        List<Movement> movementList = movementRepository.findAll();
        assertThat(movementList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllMovements() throws Exception {
        // Initialize the database
        movementRepository.saveAndFlush(movement);

        // Get all the movementList
        restMovementMockMvc.perform(get("/api/movements?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(movement.getId().intValue())))
            .andExpect(jsonPath("$.[*].location").value(hasItem(DEFAULT_LOCATION.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].timeStamp").value(hasItem(sameInstant(DEFAULT_TIME_STAMP))));
    }
    
    @Test
    @Transactional
    public void getMovement() throws Exception {
        // Initialize the database
        movementRepository.saveAndFlush(movement);

        // Get the movement
        restMovementMockMvc.perform(get("/api/movements/{id}", movement.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(movement.getId().intValue()))
            .andExpect(jsonPath("$.location").value(DEFAULT_LOCATION.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.timeStamp").value(sameInstant(DEFAULT_TIME_STAMP)));
    }

    @Test
    @Transactional
    public void getNonExistingMovement() throws Exception {
        // Get the movement
        restMovementMockMvc.perform(get("/api/movements/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMovement() throws Exception {
        // Initialize the database
        movementService.save(movement);

        int databaseSizeBeforeUpdate = movementRepository.findAll().size();

        // Update the movement
        Movement updatedMovement = movementRepository.findById(movement.getId()).get();
        // Disconnect from session so that the updates on updatedMovement are not directly saved in db
        em.detach(updatedMovement);
        updatedMovement
            .location(UPDATED_LOCATION)
            .type(UPDATED_TYPE)
            .timeStamp(UPDATED_TIME_STAMP);

        restMovementMockMvc.perform(put("/api/movements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMovement)))
            .andExpect(status().isOk());

        // Validate the Movement in the database
        List<Movement> movementList = movementRepository.findAll();
        assertThat(movementList).hasSize(databaseSizeBeforeUpdate);
        Movement testMovement = movementList.get(movementList.size() - 1);
        assertThat(testMovement.getLocation()).isEqualTo(UPDATED_LOCATION);
        assertThat(testMovement.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testMovement.getTimeStamp()).isEqualTo(UPDATED_TIME_STAMP);
    }

    @Test
    @Transactional
    public void updateNonExistingMovement() throws Exception {
        int databaseSizeBeforeUpdate = movementRepository.findAll().size();

        // Create the Movement

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMovementMockMvc.perform(put("/api/movements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(movement)))
            .andExpect(status().isBadRequest());

        // Validate the Movement in the database
        List<Movement> movementList = movementRepository.findAll();
        assertThat(movementList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMovement() throws Exception {
        // Initialize the database
        movementService.save(movement);

        int databaseSizeBeforeDelete = movementRepository.findAll().size();

        // Get the movement
        restMovementMockMvc.perform(delete("/api/movements/{id}", movement.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Movement> movementList = movementRepository.findAll();
        assertThat(movementList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Movement.class);
        Movement movement1 = new Movement();
        movement1.setId(1L);
        Movement movement2 = new Movement();
        movement2.setId(movement1.getId());
        assertThat(movement1).isEqualTo(movement2);
        movement2.setId(2L);
        assertThat(movement1).isNotEqualTo(movement2);
        movement1.setId(null);
        assertThat(movement1).isNotEqualTo(movement2);
    }
}
