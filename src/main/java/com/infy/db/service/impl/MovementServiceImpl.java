package com.infy.db.service.impl;

import com.infy.db.service.MovementService;
import com.infy.db.domain.Movement;
import com.infy.db.repository.MovementRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Movement.
 */
@Service
@Transactional
public class MovementServiceImpl implements MovementService {

    private final Logger log = LoggerFactory.getLogger(MovementServiceImpl.class);

    private final MovementRepository movementRepository;

    public MovementServiceImpl(MovementRepository movementRepository) {
        this.movementRepository = movementRepository;
    }

    /**
     * Save a movement.
     *
     * @param movement the entity to save
     * @return the persisted entity
     */
    @Override
    public Movement save(Movement movement) {
        log.debug("Request to save Movement : {}", movement);
        return movementRepository.save(movement);
    }

    /**
     * Get all the movements.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Movement> findAll() {
        log.debug("Request to get all Movements");
        return movementRepository.findAll();
    }


    /**
     * Get one movement by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Movement> findOne(Long id) {
        log.debug("Request to get Movement : {}", id);
        return movementRepository.findById(id);
    }

    /**
     * Delete the movement by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Movement : {}", id);
        movementRepository.deleteById(id);
    }
}
