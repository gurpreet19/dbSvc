package com.infy.db.service;

import com.infy.db.domain.Movement;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Movement.
 */
public interface MovementService {

    /**
     * Save a movement.
     *
     * @param movement the entity to save
     * @return the persisted entity
     */
    Movement save(Movement movement);

    /**
     * Get all the movements.
     *
     * @return the list of entities
     */
    List<Movement> findAll();


    /**
     * Get the "id" movement.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Movement> findOne(Long id);

    /**
     * Delete the "id" movement.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
