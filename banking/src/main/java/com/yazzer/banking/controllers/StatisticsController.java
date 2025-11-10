package com.yazzer.banking.controllers;

import com.yazzer.banking.dto.TransactionSumDetails;
import com.yazzer.banking.services.StatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/statistics")
@RequiredArgsConstructor
public class StatisticsController {

    private final StatisticsService statisticsService;

    @GetMapping("/sum-by-date/{user-id}")
    public ResponseEntity<List<TransactionSumDetails>> findSumTransactionByDate(
            @PathVariable("user-id") Integer userId,
            @RequestParam("start-date") @DateTimeFormat (pattern = "yyyy-MM-dd") LocalDate startDate,
            @RequestParam("end-date") @DateTimeFormat (pattern = "yyyy-MM-dd") LocalDate endDate
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
