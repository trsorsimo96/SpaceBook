package com.space.book.repository;

import com.space.book.domain.GroupAirlineAlliance;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the GroupAirlineAlliance entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GroupAirlineAllianceRepository extends JpaRepository<GroupAirlineAlliance, Long> {

}
