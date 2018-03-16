package com.space.book.repository.search;

import com.space.book.domain.AddressInBooking;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the AddressInBooking entity.
 */
public interface AddressInBookingSearchRepository extends ElasticsearchRepository<AddressInBooking, Long> {
}
