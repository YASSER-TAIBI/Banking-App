package com.yazzer.banking.services.impl;

import com.yazzer.banking.dto.TransactionSumDetails;
import com.yazzer.banking.models.TransactionType;
import com.yazzer.banking.repositories.TransactionRepository;
import com.yazzer.banking.repositories.UserRepository;
import com.yazzer.banking.services.StatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StatisticsServiceImpl implements StatisticsService {

    private final TransactionRepository transactionRepository;
    private final UserRepository userRepository;

    @Override
    public List<TransactionSumDetails> findSumTransactionByDate(LocalDate startDate, LocalDate endDate, Integer userId) {
        LocalDateTime start =LocalDateTime.of(startDate, LocalTime.of(0, 0, 0));
        LocalDateTime end =LocalDateTime.of(endDate, LocalTime.of(23, 59, 59));
        return transactionRepository.findSumTransactionsByDate(start,end, userId);
    }

    @Override
    public BigDecimal getAccountBalance(Integer userId) {
        return transactionRepository.findAccontBalance(userId);
    }

    @Override
    public BigDecimal highestTransaction(Integer userId) {
        return transactionRepository.findHighestAmountByTransactionType(userId, TransactionType.TRANSFER);
    }

    @Override
    public BigDecimal highestDeposit(Integer userId) {
        return transactionRepository.findHighestAmountByTransactionType(userId, TransactionType.DEPOSIT);
    }

    @Override
    public LocalDateTime PreviousDateLogin(Integer userId) {
        return userRepository.findPreviousLogin(userId);
    }

    @Override
    public List<TransactionSumDetails> findAllSumTransactionByDate(Integer userId) {
        return transactionRepository.findAllSumTransactionsByDate(userId);
    }

    
}
