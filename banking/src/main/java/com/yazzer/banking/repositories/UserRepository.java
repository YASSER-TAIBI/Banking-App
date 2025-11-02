package com.yazzer.banking.repositories;

import com.yazzer.banking.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}
