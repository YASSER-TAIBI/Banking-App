package com.yazzer.banking.dto;

import com.yazzer.banking.models.Address;
import com.yazzer.banking.models.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class AddressDto {

    private Integer id;

    private String street;

    private String city;

    private Integer houseNumber;

    private Integer zipCode;

    private String country;

    private Integer userId;

    public static AddressDto fromEntity(Address address) {
        if (address == null) {
            return null;
            // TODO throw an exception
        }
        return AddressDto.builder()
                .id(address.getId())
                .street(address.getStreet())
                .city(address.getCity())
                .houseNumber(address.getHouseNumber())
                .zipCode(address.getZipCode())
                .country(address.getCountry())
                .userId(address.getUser().getId())
                .build();
    }

    public static Address toEntity(AddressDto addressDto) {
        if (addressDto == null) {
            return null;
            // TODO throw an exception
        }
        return Address.builder()
                .id(addressDto.getId())
                .street(addressDto.getStreet())
                .city(addressDto.getCity())
                .houseNumber(addressDto.getHouseNumber())
                .zipCode(addressDto.getZipCode())
                .country(addressDto.getCountry())
                .user(
                        User.builder()
                                .id(addressDto.getUserId())
                                .build()
                )
                .build();
    }
}
