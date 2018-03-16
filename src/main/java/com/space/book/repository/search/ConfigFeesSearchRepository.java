package com.space.book.repository.search;

import com.space.book.domain.ConfigFees;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ConfigFees entity.
 */
public interface ConfigFeesSearchRepository extends ElasticsearchRepository<ConfigFees, Long> {
}
