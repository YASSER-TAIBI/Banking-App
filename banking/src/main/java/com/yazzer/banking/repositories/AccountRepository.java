package com.yazzer.banking.repositories;

import com.yazzer.banking.models.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {

    Optional<Account> findByIban(String iban);

    Optional<Account> findByUserId(Integer id);

}
