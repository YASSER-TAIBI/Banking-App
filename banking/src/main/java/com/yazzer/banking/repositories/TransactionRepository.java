package com.yazzer.banking.repositories;

import com.yazzer.banking.dto.TransactionDto;
import com.yazzer.banking.models.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Integer> {

    List<Transaction> findAllByUserId(Integer userId);
}
