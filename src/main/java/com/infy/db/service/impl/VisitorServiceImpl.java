package com.infy.db.service.impl;

import com.infy.db.service.VisitorService;
import com.infy.db.domain.Visitor;
import com.infy.db.repository.VisitorRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Visitor.
 */
@Service
@Transactional
public class VisitorServiceImpl implements VisitorService {

    private final Logger log = LoggerFactory.getLogger(VisitorServiceImpl.class);

    private final VisitorRepository visitorRepository;

    public VisitorServiceImpl(VisitorRepository visitorRepository) {
        this.visitorRepository = visitorRepository;
    }

    /**
     * Save a visitor.
     *
     * @param visitor the entity to save
     * @return the persisted entity
     */
    @Override
    public Visitor save(Visitor visitor) {
        log.debug("Request to save Visitor : {}", visitor);
        return visitorRepository.save(visitor);
    }

    /**
     * Get all the visitors.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Visitor> findAll() {
        log.debug("Request to get all Visitors");
        return visitorRepository.findAll();
    }


    /**
     * Get one visitor by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Visitor> findOne(Long id) {
        log.debug("Request to get Visitor : {}", id);
        return visitorRepository.findById(id);
    }

    /**
     * Delete the visitor by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Visitor : {}", id);
        visitorRepository.deleteById(id);
    }
}
