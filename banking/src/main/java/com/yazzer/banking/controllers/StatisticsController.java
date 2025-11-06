package com.yazzer.banking.controllers;

import com.yazzer.banking.services.StatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/statistics")
@RequiredArgsConstructor
public class StatisticsController {

    private final StatisticsService statisticsService;

    @GetMapping("/sum-bu-date/{user-id}")
    public ResponseEntity<Map<LocalDate, BigDecimal>> findSumTransactionByDate(
            @PathVariable("start-date") LocalDate startDate,
            @PathVariable("end-date") LocalDate endDate,
            @PathVariable("user-id") Integer userId
    ){
        return ResponseEntity.ok(statisticsService.findSumTransactionByDate(startDate, endDate, userId));
    }

    @GetMapping("/account-balance/{user-id}")
    public ResponseEntity<BigDecimal> getAccountBalance(
            @PathVariable("user-id") Integer userId
    ){
        return ResponseEntity.ok(statisticsService.getAccountBalance(userId));
    }

    @GetMapping("/highest-transfer/{user-id}")
    public ResponseEntity<BigDecimal> highestTransaction(
            @PathVariable("user-id") Integer userId
    ){
        return ResponseEntity.ok(statisticsService.highestTransaction(userId));
    }

    @GetMapping("/highest-deposit/{user-id}")
    public ResponseEntity<BigDecimal> highestDeposit(
            @PathVariable("user-id") Integer userId
    ){
        return ResponseEntity.ok(statisticsService.highestDeposit(userId));
    }
}
