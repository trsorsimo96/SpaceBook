package com.space.book.repository.search;

import com.space.book.domain.PhoneInBooking;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the PhoneInBooking entity.
 */
public interface PhoneInBookingSearchRepository extends ElasticsearchRepository<PhoneInBooking, Long> {
}
