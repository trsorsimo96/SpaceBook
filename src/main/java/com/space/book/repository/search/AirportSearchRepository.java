package com.space.book.repository.search;

import com.space.book.domain.Airport;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Airport entity.
 */
public interface AirportSearchRepository extends ElasticsearchRepository<Airport, Long> {
}
