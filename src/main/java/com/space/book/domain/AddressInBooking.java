package com.space.book.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

import com.space.book.domain.enumeration.TypeAddress;

/**
 * A AddressInBooking.
 */
@Entity
@Table(name = "address_in_booking")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "addressinbooking")
public class AddressInBooking implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "customer_name", nullable = false)
    private String customerName;

    @NotNull
    @Column(name = "street_address_1", nullable = false)
    private String streetAddress1;

    @Column(name = "street_address_2")
    private String streetAddress2;

    @NotNull
    @Column(name = "city", nullable = false)
    private String city;

    @Column(name = "state")
    private String state;

    @NotNull
    @Column(name = "zip", nullable = false)
    private String zip;

    @Enumerated(EnumType.STRING)
    @Column(name = "type_address")
    private TypeAddress typeAddress;

    @ManyToOne
    private Country address;

    @ManyToOne
    private Booking address;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCustomerName() {
        return customerName;
    }

    public AddressInBooking customerName(String customerName) {
        this.customerName = customerName;
        return this;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getStreetAddress1() {
        return streetAddress1;
    }

    public AddressInBooking streetAddress1(String streetAddress1) {
        this.streetAddress1 = streetAddress1;
        return this;
    }

    public void setStreetAddress1(String streetAddress1) {
        this.streetAddress1 = streetAddress1;
    }

    public String getStreetAddress2() {
        return streetAddress2;
    }

    public AddressInBooking streetAddress2(String streetAddress2) {
        this.streetAddress2 = streetAddress2;
        return this;
    }

    public void setStreetAddress2(String streetAddress2) {
        this.streetAddress2 = streetAddress2;
    }

    public String getCity() {
        return city;
    }

    public AddressInBooking city(String city) {
        this.city = city;
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public AddressInBooking state(String state) {
        this.state = state;
        return this;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZip() {
        return zip;
    }

    public AddressInBooking zip(String zip) {
        this.zip = zip;
        return this;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    public TypeAddress getTypeAddress() {
        return typeAddress;
    }

    public AddressInBooking typeAddress(TypeAddress typeAddress) {
        this.typeAddress = typeAddress;
        return this;
    }

    public void setTypeAddress(TypeAddress typeAddress) {
        this.typeAddress = typeAddress;
    }

    public Country getAddress() {
        return address;
    }

    public AddressInBooking address(Country country) {
        this.address = country;
        return this;
    }

    public void setAddress(Country country) {
        this.address = country;
    }

    public Booking getAddress() {
        return address;
    }

    public AddressInBooking address(Booking booking) {
        this.address = booking;
        return this;
    }

    public void setAddress(Booking booking) {
        this.address = booking;
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
        AddressInBooking addressInBooking = (AddressInBooking) o;
        if (addressInBooking.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), addressInBooking.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AddressInBooking{" +
            "id=" + getId() +
            ", customerName='" + getCustomerName() + "'" +
            ", streetAddress1='" + getStreetAddress1() + "'" +
            ", streetAddress2='" + getStreetAddress2() + "'" +
            ", city='" + getCity() + "'" +
            ", state='" + getState() + "'" +
            ", zip='" + getZip() + "'" +
            ", typeAddress='" + getTypeAddress() + "'" +
            "}";
    }
}
