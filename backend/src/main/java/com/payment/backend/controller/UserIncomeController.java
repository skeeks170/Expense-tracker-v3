package com.payment.backend.controller;

import com.payment.backend.entities.UserIncome;
import com.payment.backend.service.UserIncomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class UserIncomeController {

    @Autowired
    UserIncomeService userIncomeService;

    @GetMapping("/income/history/{userId}")
    ResponseEntity<Page<UserIncome>> getIncomeByUserId(@PathVariable int userId,
                                                       @RequestParam(defaultValue = "1") int page,
                                                       @RequestParam(defaultValue = "5") int pageSize) {
        Page<UserIncome> incomeHistory = userIncomeService.getUserIncomeListByUserId(userId, page, pageSize);
        return ResponseEntity.ok(incomeHistory);
    }

    @GetMapping("/income/list/{userId}")
    public ResponseEntity<List<UserIncome>> getIncomeListByUserId(@PathVariable int userId) {
        List<UserIncome> incomeList = userIncomeService.getAllIncomeByUserId(userId);
        return ResponseEntity.ok(incomeList);
    }

    @PostMapping("/income/create/{userId}")
    ResponseEntity<String> addUserIncomeById(@PathVariable int userId, @RequestBody UserIncome userIncome) {
        userIncomeService.addUserIncome(userId, userIncome);
        return ResponseEntity.ok("Income Added");
    }

    @PutMapping("/income/update/{incomeId}")
    ResponseEntity<String> updateUserIncomeById(@PathVariable int incomeId, @RequestBody UserIncome userIncome) {
        userIncomeService.updateUserIncome(incomeId, userIncome);
        return ResponseEntity.ok("Income Updated");
    }

    @DeleteMapping("/income/delete/{incomeId}")
    ResponseEntity<String> deleteUserIncomeById(@PathVariable int incomeId) {
        userIncomeService.deleteUserIncome(incomeId);
        return ResponseEntity.ok("Income Deleted");
    }

    @GetMapping("/income/{incomeId}")
    ResponseEntity<UserIncome> getUserIncomeById(@PathVariable int incomeId) {
        UserIncome userIncome = userIncomeService.getUserIncomeById(incomeId);
        if (userIncome == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(userIncome);
    }
}

