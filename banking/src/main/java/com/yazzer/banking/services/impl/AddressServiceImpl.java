package com.yazzer.banking.services.impl;

import com.yazzer.banking.dto.AddressDto;
import com.yazzer.banking.models.Address;
import com.yazzer.banking.repositories.AddressRepository;
import com.yazzer.banking.services.AddressService;
import com.yazzer.banking.validators.ObjectsValidator;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {

    private final AddressRepository repository;
    private final ObjectsValidator<AddressDto> validator;

    @Override
    public Integer save(AddressDto dto) {
        validator.validate(dto);
        Address address = AddressDto.toEntity(dto);
        return repository.save(address).getId();
    }

    @Override
    public List<AddressDto> findAll() {
        return repository.findAll()
                .stream()
                .map(AddressDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public AddressDto findById(Integer id) {
        return repository.findById(id)
                .map(AddressDto::fromEntity)
                .orElseThrow(() -> new EntityNotFoundException("No user was found with the ID :"  + id));
    }

    @Override
    public void delete(Integer id) {
        // TODO check before delete
        repository.deleteById(id);
    }
}
