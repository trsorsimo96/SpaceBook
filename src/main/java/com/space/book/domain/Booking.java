package com.space.book.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

import com.space.book.domain.enumeration.FormOfPayment;

/**
 * A Booking.
 */
@Entity
@Table(name = "booking")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "booking")
public class Booking implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "pnr")
    private String pnr;

    @Enumerated(EnumType.STRING)
    @Column(name = "form_of_payment")
    private FormOfPayment formOfPayment;

    @Column(name = "jhi_cost")
    private Integer cost;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPnr() {
        return pnr;
    }

    public Booking pnr(String pnr) {
        this.pnr = pnr;
        return this;
    }

    public void setPnr(String pnr) {
        this.pnr = pnr;
    }

    public FormOfPayment getFormOfPayment() {
        return formOfPayment;
    }

    public Booking formOfPayment(FormOfPayment formOfPayment) {
        this.formOfPayment = formOfPayment;
        return this;
    }

    public void setFormOfPayment(FormOfPayment formOfPayment) {
        this.formOfPayment = formOfPayment;
    }

    public Integer getCost() {
        return cost;
    }

    public Booking cost(Integer cost) {
        this.cost = cost;
        return this;
    }

    public void setCost(Integer cost) {
        this.cost = cost;
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
        Booking booking = (Booking) o;
        if (booking.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), booking.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Booking{" +
            "id=" + getId() +
            ", pnr='" + getPnr() + "'" +
            ", formOfPayment='" + getFormOfPayment() + "'" +
            ", cost=" + getCost() +
            "}";
    }
}
