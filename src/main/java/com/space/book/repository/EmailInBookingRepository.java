package com.space.book.repository;

import com.space.book.domain.EmailInBooking;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the EmailInBooking entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EmailInBookingRepository extends JpaRepository<EmailInBooking, Long> {

}
