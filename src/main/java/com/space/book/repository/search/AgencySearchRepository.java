package com.space.book.repository.search;

import com.space.book.domain.Agency;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Agency entity.
 */
public interface AgencySearchRepository extends ElasticsearchRepository<Agency, Long> {
}
