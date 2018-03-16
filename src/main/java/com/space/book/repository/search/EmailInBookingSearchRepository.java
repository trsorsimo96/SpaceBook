package com.space.book.repository.search;

import com.space.book.domain.EmailInBooking;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the EmailInBooking entity.
 */
public interface EmailInBookingSearchRepository extends ElasticsearchRepository<EmailInBooking, Long> {
}
