package com.space.book.repository.search;

import com.space.book.domain.Corporate;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Corporate entity.
 */
public interface CorporateSearchRepository extends ElasticsearchRepository<Corporate, Long> {
}
