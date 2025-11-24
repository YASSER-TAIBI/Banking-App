package com.yazzer.banking.dto;

import com.yazzer.banking.models.User;
import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class UserDto {

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

    @NotNull(message = "le Mot de passe ne doit pas etre vide")
    @NotEmpty(message = "le Mot de passe ne doit pas etre vide")
    @NotBlank(message = "le Mot de passe ne doit pas etre vide")
    @Size(min = 8, max = 16, message = "le Mot de passe doit être comprise entre 8 et 16")
    private String password;

    @NotNull(message = "la confirmation du mot de passe ne doit pas etre vide")
    @NotEmpty(message = "la confirmation du mot de passe ne doit pas etre vide")
    @NotBlank(message = "la confirmation du mot de passe ne doit pas etre vide")
    private String confirmPassword;

    public static UserDto fromEntity(User user) {
        if (user == null) {
            return null;
            // TODO throw an exception
        }
        return UserDto.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .password(user.getPassword())
                .build();
    }

    public static User toEntity(UserDto userDto) {
        if (userDto == null) {
            return null;
            // TODO throw an exception
        }
        return User.builder()
                .id(userDto.getId())
                .firstName(userDto.getFirstName())
                .lastName(userDto.getLastName())
                .email(userDto.getEmail())
                .password(userDto.getPassword())
                .build();
    }
}
