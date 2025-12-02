package com.yazzer.banking.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

// Interface pour implementer la projection
public interface TransactionSumDetails {

    LocalDate getTransactionDate();

    BigDecimal getAmount();
}
