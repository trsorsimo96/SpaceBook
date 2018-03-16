package com.space.book.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

import com.space.book.domain.enumeration.PhoneType;

/**
 * A PhoneInBooking.
 */
@Entity
@Table(name = "phone_in_booking")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "phoneinbooking")
public class PhoneInBooking implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "phone_type", nullable = false)
    private PhoneType phoneType;

    @NotNull
    @Column(name = "jhi_number", nullable = false)
    private String number;

    @ManyToOne
    private Booking booking;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PhoneType getPhoneType() {
        return phoneType;
    }

    public PhoneInBooking phoneType(PhoneType phoneType) {
        this.phoneType = phoneType;
        return this;
    }

    public void setPhoneType(PhoneType phoneType) {
        this.phoneType = phoneType;
    }

    public String getNumber() {
        return number;
    }

    public PhoneInBooking number(String number) {
        this.number = number;
        return this;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public Booking getBooking() {
        return booking;
    }

    public PhoneInBooking booking(Booking booking) {
        this.booking = booking;
        return this;
    }

    public void setBooking(Booking booking) {
        this.booking = booking;
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
        PhoneInBooking phoneInBooking = (PhoneInBooking) o;
        if (phoneInBooking.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), phoneInBooking.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "PhoneInBooking{" +
            "id=" + getId() +
            ", phoneType='" + getPhoneType() + "'" +
            ", number='" + getNumber() + "'" +
            "}";
    }
}
