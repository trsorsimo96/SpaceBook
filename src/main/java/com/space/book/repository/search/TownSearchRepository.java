package com.space.book.repository.search;

import com.space.book.domain.Town;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Town entity.
 */
public interface TownSearchRepository extends ElasticsearchRepository<Town, Long> {
}
