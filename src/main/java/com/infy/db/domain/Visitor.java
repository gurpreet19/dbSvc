package com.infy.db.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.infy.db.domain.enumeration.VisitorType;

/**
 * A Visitor.
 */
@Entity
@Table(name = "visitor")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Visitor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 3, max = 25)
    @Column(name = "name", length = 25, nullable = false)
    private String name;

    @NotNull
    @Column(name = "visitor_id", nullable = false, unique = true)
    private Integer visitorId;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type", nullable = false)
    private VisitorType type;

    @NotNull
    @Column(name = "allowed_from", nullable = false)
    private ZonedDateTime allowedFrom;

    @NotNull
    @Column(name = "allowed_to", nullable = false)
    private ZonedDateTime allowedTo;

    @NotNull
    @Column(name = "location", nullable = false)
    private String location;

    @NotNull
    @Pattern(regexp = "^[a-zA-Z0-9]*$")
    @Column(name = "email", nullable = false)
    private String email;

    @NotNull
    @Min(value = 1000000000)
    @Max(value = 9999999999L)
    @Column(name = "phone", nullable = false)
    private Integer phone;

    @NotNull
    @Column(name = "status", nullable = false)
    private Boolean status;

    @NotNull
    @Column(name = "qr_string", nullable = false)
    private String qrString;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("")
    private Employee employee;

    @OneToMany(mappedBy = "visitor")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Movement> movements = new HashSet<>();
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

    public Visitor name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getVisitorId() {
        return visitorId;
    }

    public Visitor visitorId(Integer visitorId) {
        this.visitorId = visitorId;
        return this;
    }

    public void setVisitorId(Integer visitorId) {
        this.visitorId = visitorId;
    }

    public VisitorType getType() {
        return type;
    }

    public Visitor type(VisitorType type) {
        this.type = type;
        return this;
    }

    public void setType(VisitorType type) {
        this.type = type;
    }

    public ZonedDateTime getAllowedFrom() {
        return allowedFrom;
    }

    public Visitor allowedFrom(ZonedDateTime allowedFrom) {
        this.allowedFrom = allowedFrom;
        return this;
    }

    public void setAllowedFrom(ZonedDateTime allowedFrom) {
        this.allowedFrom = allowedFrom;
    }

    public ZonedDateTime getAllowedTo() {
        return allowedTo;
    }

    public Visitor allowedTo(ZonedDateTime allowedTo) {
        this.allowedTo = allowedTo;
        return this;
    }

    public void setAllowedTo(ZonedDateTime allowedTo) {
        this.allowedTo = allowedTo;
    }

    public String getLocation() {
        return location;
    }

    public Visitor location(String location) {
        this.location = location;
        return this;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getEmail() {
        return email;
    }

    public Visitor email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getPhone() {
        return phone;
    }

    public Visitor phone(Integer phone) {
        this.phone = phone;
        return this;
    }

    public void setPhone(Integer phone) {
        this.phone = phone;
    }

    public Boolean isStatus() {
        return status;
    }

    public Visitor status(Boolean status) {
        this.status = status;
        return this;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public String getQrString() {
        return qrString;
    }

    public Visitor qrString(String qrString) {
        this.qrString = qrString;
        return this;
    }

    public void setQrString(String qrString) {
        this.qrString = qrString;
    }

    public Employee getEmployee() {
        return employee;
    }

    public Visitor employee(Employee employee) {
        this.employee = employee;
        return this;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Set<Movement> getMovements() {
        return movements;
    }

    public Visitor movements(Set<Movement> movements) {
        this.movements = movements;
        return this;
    }

    public Visitor addMovement(Movement movement) {
        this.movements.add(movement);
        movement.setVisitor(this);
        return this;
    }

    public Visitor removeMovement(Movement movement) {
        this.movements.remove(movement);
        movement.setVisitor(null);
        return this;
    }

    public void setMovements(Set<Movement> movements) {
        this.movements = movements;
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
        Visitor visitor = (Visitor) o;
        if (visitor.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), visitor.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Visitor{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", visitorId=" + getVisitorId() +
            ", type='" + getType() + "'" +
            ", allowedFrom='" + getAllowedFrom() + "'" +
            ", allowedTo='" + getAllowedTo() + "'" +
            ", location='" + getLocation() + "'" +
            ", email='" + getEmail() + "'" +
            ", phone=" + getPhone() +
            ", status='" + isStatus() + "'" +
            ", qrString='" + getQrString() + "'" +
            "}";
    }
}
