package com.yazzer.banking.dto;

import com.yazzer.banking.models.Contact;
import com.yazzer.banking.models.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class ContactDto {

    private Integer id;

    private String firstName;

    private String lastName;

    private String email;

    private String iban;

    private Integer userId;

    public static ContactDto fromEntity(Contact contact) {
        if (contact == null) {
            return null;
            // TODO throw an exception
        }
        return ContactDto.builder()
                .id(contact.getId())
                .firstName(contact.getFirstName())
                .lastName(contact.getLastName())
                .email(contact.getEmail())
                .iban(contact.getIban())
                .userId(contact.getUser().getId())
                .build();
    }

    public static Contact toEntity(ContactDto contactDto) {
        if (contactDto == null) {
            return null;
            // TODO throw an exception
        }
        return Contact.builder()
                .id(contactDto.getId())
                .firstName(contactDto.getFirstName())
                .lastName(contactDto.getLastName())
                .email(contactDto.getEmail())
                .iban(contactDto.getIban())
                .user(
                        User.builder()
                                .id(contactDto.getUserId())
                                .build()
                )
                .build();
    }
}
