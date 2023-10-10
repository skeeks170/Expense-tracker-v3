package com.payment.backend.controller;

import com.payment.backend.entities.UserIncome;
import com.payment.backend.exception.AppException;
import com.payment.backend.service.UserIncomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class UserIncomeController {

    @Autowired
    UserIncomeService userIncomeService;

    @GetMapping("/income/history/{userId}")
    public ResponseEntity<Page<UserIncome>> getIncomeByUserId(@PathVariable int userId,
                                                              @RequestParam(defaultValue = "1") int page,
                                                              @RequestParam(defaultValue = "5") int pageSize) {
        try {
            Page<UserIncome> incomeHistory = userIncomeService.getUserIncomeListByUserId(userId, page, pageSize);
            return ResponseEntity.ok(incomeHistory);
        } catch (Exception ex) {
            throw new AppException("Error fetching income history", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/income/list/{userId}")
    public ResponseEntity<List<UserIncome>> getIncomeListByUserId(@PathVariable int userId) {
        try {
            List<UserIncome> incomeList = userIncomeService.getAllIncomeByUserId(userId);
            return ResponseEntity.ok(incomeList);
        } catch (Exception ex) {
            throw new AppException("Error fetching income list", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/income/create/{userId}")
    public ResponseEntity<String> addUserIncomeById(@PathVariable int userId, @RequestBody UserIncome userIncome) {
        try {
            userIncomeService.addUserIncome(userId, userIncome);
            return ResponseEntity.ok("Income Added");
        } catch (Exception ex) {
            throw new AppException("Error adding income", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/income/update/{incomeId}")
    public ResponseEntity<String> updateUserIncomeById(@PathVariable int incomeId, @RequestBody UserIncome userIncome) {
        try {
            userIncomeService.updateUserIncome(incomeId, userIncome);
            return ResponseEntity.ok("Income Updated");
        } catch (Exception ex) {
            throw new AppException("Error updating income", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/income/delete/{incomeId}")
    public ResponseEntity<String> deleteUserIncomeById(@PathVariable int incomeId) {
        try {
            userIncomeService.deleteUserIncome(incomeId);
            return ResponseEntity.ok("Income Deleted");
        } catch (Exception ex) {
            throw new AppException("Error deleting income", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/income/{incomeId}")
    public ResponseEntity<UserIncome> getUserIncomeById(@PathVariable int incomeId) {
        try {
            UserIncome userIncome = userIncomeService.getUserIncomeById(incomeId);
            if (userIncome == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(userIncome);
        } catch (Exception ex) {
            throw new AppException("Error fetching income by ID", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
