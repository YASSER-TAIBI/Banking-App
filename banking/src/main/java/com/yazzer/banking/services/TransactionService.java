package com.yazzer.banking.services;

import com.yazzer.banking.dto.TransactionDto;

import java.util.List;

public interface TransactionService extends AbstractService<TransactionDto> {

    List<TransactionDto> findAllByUserId (Integer userId);
}
