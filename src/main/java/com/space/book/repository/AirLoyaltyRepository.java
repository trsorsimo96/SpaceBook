package com.space.book.repository;

import com.space.book.domain.AirLoyalty;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the AirLoyalty entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AirLoyaltyRepository extends JpaRepository<AirLoyalty, Long> {

}
