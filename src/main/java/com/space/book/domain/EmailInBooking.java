package com.space.book.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

import com.space.book.domain.enumeration.EmailType;

/**
 * A EmailInBooking.
 */
@Entity
@Table(name = "email_in_booking")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "emailinbooking")
public class EmailInBooking implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "email_type", nullable = false)
    private EmailType emailType;

    @NotNull
    @Column(name = "email", nullable = false)
    private String email;

    @ManyToOne
    private Booking emails;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public EmailType getEmailType() {
        return emailType;
    }

    public EmailInBooking emailType(EmailType emailType) {
        this.emailType = emailType;
        return this;
    }

    public void setEmailType(EmailType emailType) {
        this.emailType = emailType;
    }

    public String getEmail() {
        return email;
    }

    public EmailInBooking email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Booking getEmails() {
        return emails;
    }

    public EmailInBooking emails(Booking booking) {
        this.emails = booking;
        return this;
    }

    public void setEmails(Booking booking) {
        this.emails = booking;
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
        EmailInBooking emailInBooking = (EmailInBooking) o;
        if (emailInBooking.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), emailInBooking.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "EmailInBooking{" +
            "id=" + getId() +
            ", emailType='" + getEmailType() + "'" +
            ", email='" + getEmail() + "'" +
            "}";
    }
}
