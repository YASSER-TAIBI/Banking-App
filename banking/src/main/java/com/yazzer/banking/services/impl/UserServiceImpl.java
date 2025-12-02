package com.yazzer.banking.services.impl;

import com.yazzer.banking.config.JwtUtils;
import com.yazzer.banking.dto.AccountDto;
import com.yazzer.banking.dto.AuthenticationRequest;
import com.yazzer.banking.dto.AuthenticationResponse;
import com.yazzer.banking.dto.UserDto;
import com.yazzer.banking.exceptions.OperationNonPermittedException;
import com.yazzer.banking.models.Account;
import com.yazzer.banking.models.Role;
import com.yazzer.banking.models.User;
import com.yazzer.banking.repositories.AccountRepository;
import com.yazzer.banking.repositories.RoleRepository;
import com.yazzer.banking.repositories.UserRepository;
import com.yazzer.banking.services.AccountService;
import com.yazzer.banking.services.UserService;
import com.yazzer.banking.validators.ObjectsValidator;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private static final String ROLE_USER = "ROLE_USER";
    private final UserRepository repository;
    private final AccountRepository accountRepository;
    private final ObjectsValidator<UserDto> validator;
    private final AccountService accountService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authManager;
    private final RoleRepository roleRepository;

    @Override
    public Integer save(UserDto dto) {
        validator.validate(dto);
        User user = UserDto.toEntity(dto);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return repository.save(user).getId();
    }

    @Override
    @Transactional
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
            var savedAccount =accountService.save(account);
            user.setAccount(
                Account.builder()
                    .id(savedAccount)
                    .build()
            );
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
    @Transactional
    public AuthenticationResponse register(UserDto dto) {
        validator.validate(dto);

        if (!dto.getPassword().equals(dto.getConfirmPassword())) {
            throw new IllegalArgumentException("Les mots de passe ne correspondent pas");
        }

        User user = UserDto.toEntity(dto);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(findOrCreateRole(ROLE_USER));
        var savedUser = repository.save(user);
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", savedUser.getId());
        claims.put("fullName", savedUser.getFirstName() + " " + savedUser.getLastName());
        String token = jwtUtils.generateToken(savedUser, claims);
        return AuthenticationResponse.builder()
                .token(token)
                .build();
    }

    @Override
    public AuthenticationResponse login(AuthenticationRequest request) {
        authManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        final User user = repository.findByEmail(request.getEmail()).get();

        // mettre à jour la dernière connexion
        user.setPreviousLogin(user.getLastLogin());
        user.setLastLogin(LocalDateTime.now());
        repository.save(user);
        
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", user.getId());
        claims.put("fullName", user.getFirstName() + " " + user.getLastName());
        final String token = jwtUtils.generateToken(user, claims);
        return AuthenticationResponse.builder()
                .token(token)
                .build();
    }

    private Role findOrCreateRole(String roleName){
        Role role =roleRepository.findByName(roleName).orElse(null);
        if(role == null){
            return roleRepository.save(
                    Role.builder()
                            .name(roleName)
                            .build()
            );
        }
        return role;
    }


}
