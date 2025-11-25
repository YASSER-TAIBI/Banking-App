package com.yazzer.banking.handlers;

import com.yazzer.banking.exceptions.ObjectValidationException;
import com.yazzer.banking.exceptions.OperationNonPermittedException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ObjectValidationException.class)
    public ResponseEntity<ExceptionRepresentation> handleException(ObjectValidationException exeption) {
        ExceptionRepresentation representation = ExceptionRepresentation.builder()
                .errorMessage("Une exception «Objet non valide» s'est produite")
                .errorSource(exeption.getViolationSource())
                .validationErrors(exeption.getViolations())
                .build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(representation);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ExceptionRepresentation> handleException(EntityNotFoundException exeption) {
        ExceptionRepresentation representation = ExceptionRepresentation.builder()
                .errorMessage(exeption.getMessage())
                .build();
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(representation);
    }

    @ExceptionHandler(OperationNonPermittedException.class)
    public ResponseEntity<ExceptionRepresentation> handleException(OperationNonPermittedException exeption) {
        ExceptionRepresentation representation = ExceptionRepresentation.builder()
                .errorMessage(exeption.getErrorMsg())
                .build();
        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(representation);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ExceptionRepresentation> handleException() {
        ExceptionRepresentation representation = ExceptionRepresentation.builder()
                .errorMessage("Un utilisateur existe déjà avec l'adresse e-mail fournie")
                .build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(representation);
    }

    @ExceptionHandler(DisabledException.class) // l’authentification est rejetée parce que le compte est désactivé
    public ResponseEntity<ExceptionRepresentation> handleDisabledException() {
        ExceptionRepresentation representation = ExceptionRepresentation.builder()
                .errorMessage("Vous ne pouvez pas accéder à votre compte car il n'est pas encore activé")
                .build();
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(representation);
    }

    @ExceptionHandler(BadCredentialsException.class) // l’authentification est rejetée parce que les informations d’identification ne sont pas valides
    public ResponseEntity<ExceptionRepresentation> handleBadCredentialsException() {
        ExceptionRepresentation representation = ExceptionRepresentation.builder()
                .errorMessage("L'email et / ou le mot de passe est incorrect")
                .build();
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(representation);
    }

    @ExceptionHandler(IllegalArgumentException.class) // les mots de passe ne correspondent pas
    public ResponseEntity<ExceptionRepresentation> handleIllegalArgument(IllegalArgumentException e) {
        ExceptionRepresentation representation = ExceptionRepresentation.builder()
                .errorMessage("Les mots de passe ne correspondent pas")
                .build();
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(representation);
    }
}
