package com.space.book.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A AirLoyalty.
 */
@Entity
@Table(name = "air_loyalty")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "airloyalty")
public class AirLoyalty implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "jhi_number", nullable = false)
    private String number;

    @OneToOne
    @JoinColumn(unique = true)
    private Passenger card;

    @ManyToOne
    private Airline card;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumber() {
        return number;
    }

    public AirLoyalty number(String number) {
        this.number = number;
        return this;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public Passenger getCard() {
        return card;
    }

    public AirLoyalty card(Passenger passenger) {
        this.card = passenger;
        return this;
    }

    public void setCard(Passenger passenger) {
        this.card = passenger;
    }

    public Airline getCard() {
        return card;
    }

    public AirLoyalty card(Airline airline) {
        this.card = airline;
        return this;
    }

    public void setCard(Airline airline) {
        this.card = airline;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        AirLoyalty airLoyalty = (AirLoyalty) o;
        if (airLoyalty.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), airLoyalty.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AirLoyalty{" +
            "id=" + getId() +
            ", number='" + getNumber() + "'" +
            "}";
    }
}
