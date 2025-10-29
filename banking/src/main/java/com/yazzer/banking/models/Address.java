package com.yazzer.banking.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Entity
public class Address extends AbstractEntity {

    private String street;

    private String city;

    private Integer houseNumber;

    private Integer zipCode;

    private String country;

    @OneToOne
    @JoinColumn(name = "id_user")
    private User user;

}
