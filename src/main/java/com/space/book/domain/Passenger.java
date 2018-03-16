package com.space.book.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import com.space.book.domain.enumeration.TitlePassenger;

import com.space.book.domain.enumeration.TypePassenger;

/**
 * A Passenger.
 */
@Entity
@Table(name = "passenger")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "passenger")
public class Passenger implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "surname", nullable = false)
    private String surname;

    @Column(name = "middlename")
    private String middlename;

    @Column(name = "name_remark")
    private String nameRemark;

    @Enumerated(EnumType.STRING)
    @Column(name = "title")
    private TitlePassenger title;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type")
    private TypePassenger type;

    @Column(name = "age")
    private Integer age;

    @Column(name = "birthday")
    private LocalDate birthday;

    @Column(name = "passport_number")
    private String passportNumber;

    @ManyToOne
    private Corporate enterprise;

    @ManyToOne
    private Booking booking;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Passenger name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public Passenger surname(String surname) {
        this.surname = surname;
        return this;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getMiddlename() {
        return middlename;
    }

    public Passenger middlename(String middlename) {
        this.middlename = middlename;
        return this;
    }

    public void setMiddlename(String middlename) {
        this.middlename = middlename;
    }

    public String getNameRemark() {
        return nameRemark;
    }

    public Passenger nameRemark(String nameRemark) {
        this.nameRemark = nameRemark;
        return this;
    }

    public void setNameRemark(String nameRemark) {
        this.nameRemark = nameRemark;
    }

    public TitlePassenger getTitle() {
        return title;
    }

    public Passenger title(TitlePassenger title) {
        this.title = title;
        return this;
    }

    public void setTitle(TitlePassenger title) {
        this.title = title;
    }

    public TypePassenger getType() {
        return type;
    }

    public Passenger type(TypePassenger type) {
        this.type = type;
        return this;
    }

    public void setType(TypePassenger type) {
        this.type = type;
    }

    public Integer getAge() {
        return age;
    }

    public Passenger age(Integer age) {
        this.age = age;
        return this;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public LocalDate getBirthday() {
        return birthday;
    }

    public Passenger birthday(LocalDate birthday) {
        this.birthday = birthday;
        return this;
    }

    public void setBirthday(LocalDate birthday) {
        this.birthday = birthday;
    }

    public String getPassportNumber() {
        return passportNumber;
    }

    public Passenger passportNumber(String passportNumber) {
        this.passportNumber = passportNumber;
        return this;
    }

    public void setPassportNumber(String passportNumber) {
        this.passportNumber = passportNumber;
    }

    public Corporate getEnterprise() {
        return enterprise;
    }

    public Passenger enterprise(Corporate corporate) {
        this.enterprise = corporate;
        return this;
    }

    public void setEnterprise(Corporate corporate) {
        this.enterprise = corporate;
    }

    public Booking getBooking() {
        return booking;
    }

    public Passenger booking(Booking booking) {
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
        Passenger passenger = (Passenger) o;
        if (passenger.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), passenger.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Passenger{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", surname='" + getSurname() + "'" +
            ", middlename='" + getMiddlename() + "'" +
            ", nameRemark='" + getNameRemark() + "'" +
            ", title='" + getTitle() + "'" +
            ", type='" + getType() + "'" +
            ", age=" + getAge() +
            ", birthday='" + getBirthday() + "'" +
            ", passportNumber='" + getPassportNumber() + "'" +
            "}";
    }
}
