package com.payment.backend.controller;

import com.payment.backend.entities.UserExpense;
import com.payment.backend.service.UserExpenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class UserExpenseController {

    @Autowired
    UserExpenseService userExpenseService;

    @GetMapping("/expense/history/{userId}")
    ResponseEntity<Page<UserExpense>> getExpenseByUserId(@PathVariable int userId,
                                                         @RequestParam(defaultValue = "1") int page,
                                                         @RequestParam(defaultValue = "5") int pageSize) {
        Page<UserExpense> expenseHistory = userExpenseService.getUserExpenseListByUserId(userId, page, pageSize);
        return ResponseEntity.ok(expenseHistory);
    }

    @GetMapping("/expense/list/{userId}")
    public ResponseEntity<List<UserExpense>> getExpenseListByUserId(@PathVariable int userId) {
        List<UserExpense> expenseList = userExpenseService.getAllExpensesByUserId(userId);
        return ResponseEntity.ok(expenseList);
    }

    @PostMapping("/expense/create/{userId}")
    ResponseEntity<String> addUserExpenseById(@PathVariable int userId, @RequestBody UserExpense userExpense) {
        userExpenseService.addUserExpense(userId, userExpense);
        return ResponseEntity.ok("Expense Added");
    }

    @PutMapping("/expense/update/{expenseId}")
    ResponseEntity<String> updateUserExpenseById(@PathVariable int expenseId, @RequestBody UserExpense userExpense) {
        userExpenseService.updateUserExpense(expenseId, userExpense);
        return ResponseEntity.ok("Expense Updated");
    }

    @DeleteMapping("/expense/delete/{expenseId}")
    ResponseEntity<String> deleteUserExpenseById(@PathVariable int expenseId) {
        userExpenseService.deleteUserExpense(expenseId);
        return ResponseEntity.ok("Expense Deleted");
    }

    @GetMapping("/expense/{expenseId}")
    ResponseEntity<UserExpense> getUserExpenseById(@PathVariable int expenseId) {
        UserExpense userExpense = userExpenseService.getUserExpenseById(expenseId);
        if (userExpense == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(userExpense);
    }
}
