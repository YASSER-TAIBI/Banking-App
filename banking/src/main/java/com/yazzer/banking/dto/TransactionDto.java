package com.yazzer.banking.dto;

import com.yazzer.banking.models.Transaction;
import com.yazzer.banking.models.TransactionType;
import com.yazzer.banking.models.User;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class TransactionDto {

    private Integer id;

    @Positive
    private BigDecimal amount;

    private TransactionType type;

    private String destinationIban;

    private LocalDate transactionDate;

    private Integer userId;

    public static TransactionDto fromEntity(Transaction transaction) {
        if (transaction == null) {
            return null;
            // TODO throw an exception
        }
        return TransactionDto.builder()
                .id(transaction.getId())
                .amount(transaction.getAmount())
                .type(transaction.getType())
                .destinationIban(transaction.getDestinationIban())
                .transactionDate(transaction.getTransactionDate())
                .userId(transaction.getUser().getId())
                .build();
    }

    public static Transaction toEntity(TransactionDto transactionDto) {
        if (transactionDto == null) {
            return null;
            // TODO throw an exception
        }
        return Transaction.builder()
                .id(transactionDto.getId())
                .amount(transactionDto.getAmount())
                .type(transactionDto.getType())
                .destinationIban(transactionDto.getDestinationIban())
                .transactionDate(LocalDate.now())
                .user(
                        User.builder()
                                .id(transactionDto.getUserId())
                                .build()
                )
                .build();
    }

}
