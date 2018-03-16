package com.space.book.repository.search;

import com.space.book.domain.GroupAirlineAlliance;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the GroupAirlineAlliance entity.
 */
public interface GroupAirlineAllianceSearchRepository extends ElasticsearchRepository<GroupAirlineAlliance, Long> {
}
