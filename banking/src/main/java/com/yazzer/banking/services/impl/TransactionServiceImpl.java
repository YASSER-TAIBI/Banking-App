package com.yazzer.banking.services.impl;

import com.yazzer.banking.dto.TransactionDto;
import com.yazzer.banking.models.Transaction;
import com.yazzer.banking.models.TransactionType;
import com.yazzer.banking.repositories.TransactionRepository;
import com.yazzer.banking.services.TransactionService;
import com.yazzer.banking.validators.ObjectsValidator;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository repository;
    private final ObjectsValidator<TransactionDto> validator;

    @Override
    public Integer save(TransactionDto dto) {
        validator.validate(dto);
        Transaction transaction = TransactionDto.toEntity(dto);

        // Vérification si le type de transaction est un transfert ou un dépôt avec la méthode "getTransactionMultiplier",
        // qui retourne -1 si c'est un transfert et 1 si c'est un dépôt. Ensuite, on multiplie le montant par le type de transaction choisi.
        BigDecimal transactionAmount = BigDecimal.valueOf(getTransactionMultiplier(transaction.getType()));
        BigDecimal amount = transactionAmount.multiply(transaction.getAmount());
        transaction.setAmount(amount);
        return repository.save(transaction).getId();
    }

    @Override
    public List<TransactionDto> findAll() {
        return repository.findAll()
                .stream()
                .map(TransactionDto::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public TransactionDto findById(Integer id) {
        return repository.findById(id)
                .map(TransactionDto::fromEntity)
                .orElseThrow(() -> new EntityNotFoundException("No account was found with the ID :"  + id));
    }

    @Override
    public void delete(Integer id) {
        // TODO check before delete
        repository.deleteById(id);
    }

    private int getTransactionMultiplier (TransactionType type) {
        return TransactionType.TRANSFER == type ? -1 : 1 ;
    }

    @Override
    public List<TransactionDto> findAllByUserId(Integer userId) {
        return repository.findAllByUserId(userId)
                .stream()
                .map(TransactionDto::fromEntity)
                .collect(Collectors.toList());
    }
}
