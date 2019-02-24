package com.infy.db.repository;

import com.infy.db.domain.Movement;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Movement entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MovementRepository extends JpaRepository<Movement, Long> {

}
