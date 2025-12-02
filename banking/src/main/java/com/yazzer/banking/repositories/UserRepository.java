package com.yazzer.banking.repositories;

import com.yazzer.banking.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {


    Optional<User> findByEmail(String email);

    @Query("select u.previousLogin from User u where u.id = :userId")
    LocalDateTime findPreviousLogin(Integer userId);
}
