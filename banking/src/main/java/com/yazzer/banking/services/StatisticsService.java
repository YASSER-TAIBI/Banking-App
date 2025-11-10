package com.yazzer.banking.services;

import com.yazzer.banking.dto.TransactionSumDetails;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface StatisticsService {

    // entre 2 dates je récupére la somme des transaction qui seront groupées par date
    List<TransactionSumDetails> findSumTransactionByDate(LocalDate startDate, LocalDate endDate, Integer userId);

    // le solde de compte de l'utilisateur
    BigDecimal getAccountBalance(Integer userId);

    // le montant le plus élevé qui a été transféré par l'utilisateur
    BigDecimal highestTransaction(Integer userId);

    // le montant le plus élevé qui a été déposé par l'utilisateur
    BigDecimal highestDeposit(Integer userId);
}
