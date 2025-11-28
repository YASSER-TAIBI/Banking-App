package com.yazzer.banking.dto;

import com.yazzer.banking.models.Contact;
import com.yazzer.banking.models.User;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
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

    @NotNull(message = "le prenom ne doit pas etre vide")
    @NotEmpty(message = "le prenom ne doit pas etre vide")
    @NotBlank(message = "le prenom ne doit pas etre vide")
    private String firstName;

    @NotNull(message = "le nom ne doit pas etre vide")
    @NotEmpty(message = "le nom ne doit pas etre vide")
    @NotBlank(message = "le nom ne doit pas etre vide")
    private String lastName;

    @NotNull(message = "l'email ne doit pas etre vide")
    @NotEmpty(message = "l'email ne doit pas etre vide")
    @NotBlank(message = "l'email ne doit pas etre vide")
    @Email(message = "l'email n'est pas conforme")
    private String email;

    @NotNull(message = "l'iban ne doit pas etre vide")
    @NotEmpty(message = "l'iban ne doit pas etre vide")
    @NotBlank(message = "l'iban ne doit pas etre vide")
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
