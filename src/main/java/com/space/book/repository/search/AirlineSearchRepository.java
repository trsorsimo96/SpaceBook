package com.space.book.repository.search;

import com.space.book.domain.Airline;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Airline entity.
 */
public interface AirlineSearchRepository extends ElasticsearchRepository<Airline, Long> {
}
