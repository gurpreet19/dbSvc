package com.infy.db.service;

import com.infy.db.domain.Visitor;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Visitor.
 */
public interface VisitorService {

    /**
     * Save a visitor.
     *
     * @param visitor the entity to save
     * @return the persisted entity
     */
    Visitor save(Visitor visitor);

    /**
     * Get all the visitors.
     *
     * @return the list of entities
     */
    List<Visitor> findAll();


    /**
     * Get the "id" visitor.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Visitor> findOne(Long id);

    /**
     * Delete the "id" visitor.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
