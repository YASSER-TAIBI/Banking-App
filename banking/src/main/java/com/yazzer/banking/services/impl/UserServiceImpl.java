package com.yazzer.banking.services.impl;

import com.yazzer.banking.config.JwtUtils;
import com.yazzer.banking.dto.AccountDto;
import com.yazzer.banking.dto.AuthenticationRequest;
import com.yazzer.banking.dto.AuthenticationResponse;
import com.yazzer.banking.dto.UserDto;
import com.yazzer.banking.exceptions.OperationNonPermittedException;
import com.yazzer.banking.models.User;
import com.yazzer.banking.repositories.AccountRepository;
import com.yazzer.banking.repositories.UserRepository;
import com.yazzer.banking.services.AccountService;
import com.yazzer.banking.services.UserService;
import com.yazzer.banking.validators.ObjectsValidator;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository repository;
    private final AccountRepository accountRepository;
    private final ObjectsValidator<UserDto> validator;
    private final AccountService accountService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authManager;

    @Override
    public Integer save(UserDto dto) {
        validator.validate(dto);
        User user = UserDto.toEntity(dto);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return repository.save(user).getId();
    }

    @Override
    public List<UserDto> findAll() {
        return repository.findAll()
                .stream()
                .map(UserDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public UserDto findById(Integer id) {
        return repository.findById(id)
                .map(UserDto::fromEntity)
                .orElseThrow(() -> new EntityNotFoundException("No user was found with the provided ID :"  + id));
    }

    @Override
    public void delete(Integer id) {
        // TODO check before delete
        repository.deleteById(id);
    }

    @Override
    @Transactional // s'il y a une exception, on fait un rollback ou tout au tour de toutes les opérations qu'on vient d'effectuer au niveau de notre base de données
    public Integer validateAccount(Integer id) {
        User user = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("No user was found for user account validation"));

        // Si le user est déjà actif, on ne recrée pas de compte
        if (user.isActive()) {
            throw new OperationNonPermittedException(
                    "This user is already validated",
                    "Validate account",
                    "UserService",
                    "User already active"
            );
        }

        // Vérifie si un compte existe déjà
        boolean hasAccount = accountRepository.findByUserId(user.getId()).isPresent();

        // S’il n’a pas de compte, on le crée
        if (!hasAccount) {
            AccountDto account = AccountDto.builder()
                    .user(UserDto.fromEntity(user))
                    .build();
            accountService.save(account);
        }

        // Réactive le user
        user.setActive(true);
        repository.save(user);

        return user.getId();
    }

    @Override
    public Integer invalidateAccount(Integer id) {
        User user = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("No user was found for user account validation"));

        user.setActive(false);
        repository.save(user);
        return user.getId();
    }

    @Override
    public AuthenticationResponse register(UserDto dto) {
        validator.validate(dto);
        User user = UserDto.toEntity(dto);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        var savedUser = repository.save(user);
        String token = jwtUtils.generateToken(savedUser);
        return AuthenticationResponse.builder()
                .token(token)
                .build();
    }

    @Override
    public AuthenticationResponse login(AuthenticationRequest request) {
        authManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        final UserDetails user = repository.findByEmail(request.getEmail()).get();
        final String token = jwtUtils.generateToken(user);
        return AuthenticationResponse.builder()
                .token(token)
                .build();
    }


}
