package com.space.book.config;

import io.github.jhipster.config.JHipsterProperties;
import org.ehcache.config.builders.CacheConfigurationBuilder;
import org.ehcache.config.builders.ResourcePoolsBuilder;
import org.ehcache.expiry.Duration;
import org.ehcache.expiry.Expirations;
import org.ehcache.jsr107.Eh107Configuration;

import java.util.concurrent.TimeUnit;

import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.AutoConfigureBefore;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
@AutoConfigureAfter(value = { MetricsConfiguration.class })
@AutoConfigureBefore(value = { WebConfigurer.class, DatabaseConfiguration.class })
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(Expirations.timeToLiveExpiration(Duration.of(ehcache.getTimeToLiveSeconds(), TimeUnit.SECONDS)))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.space.book.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.space.book.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.space.book.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.space.book.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.space.book.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.space.book.domain.SocialUserConnection.class.getName(), jcacheConfiguration);
            cm.createCache(com.space.book.domain.Airline.class.getName(), jcacheConfiguration);
            cm.createCache(com.space.book.domain.Agency.class.getName(), jcacheConfiguration);
            cm.createCache(com.space.book.domain.Agent.class.getName(), jcacheConfiguration);
            cm.createCache(com.space.book.domain.Corporate.class.getName(), jcacheConfiguration);
            cm.createCache(com.space.book.domain.Passenger.class.getName(), jcacheConfiguration);
            cm.createCache(com.space.book.domain.AirLoyalty.class.getName(), jcacheConfiguration);
            cm.createCache(com.space.book.domain.GroupAirlineAlliance.class.getName(), jcacheConfiguration);
            cm.createCache(com.space.book.domain.Country.class.getName(), jcacheConfiguration);
            cm.createCache(com.space.book.domain.Currency.class.getName(), jcacheConfiguration);
            cm.createCache(com.space.book.domain.Airport.class.getName(), jcacheConfiguration);
            cm.createCache(com.space.book.domain.Town.class.getName(), jcacheConfiguration);
            cm.createCache(com.space.book.domain.Segment.class.getName(), jcacheConfiguration);
            cm.createCache(com.space.book.domain.PhoneInBooking.class.getName(), jcacheConfiguration);
            cm.createCache(com.space.book.domain.EmailInBooking.class.getName(), jcacheConfiguration);
            cm.createCache(com.space.book.domain.AddressInBooking.class.getName(), jcacheConfiguration);
            cm.createCache(com.space.book.domain.ConfigFees.class.getName(), jcacheConfiguration);
            cm.createCache(com.space.book.domain.Booking.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
