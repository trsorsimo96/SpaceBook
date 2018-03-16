package com.space.book.repository.search;

import com.space.book.domain.AirLoyalty;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the AirLoyalty entity.
 */
public interface AirLoyaltySearchRepository extends ElasticsearchRepository<AirLoyalty, Long> {
}
