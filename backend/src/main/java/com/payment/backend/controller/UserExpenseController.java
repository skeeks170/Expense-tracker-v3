package com.payment.backend.controller;

import com.payment.backend.entities.UserExpense;
import com.payment.backend.exception.AppException;
import com.payment.backend.service.UserExpenseService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class UserExpenseController {

    @Autowired
    UserExpenseService userExpenseService;

    @GetMapping("/expense/history/{userId}")
    public ResponseEntity<Page<UserExpense>> getExpenseByUserId(@PathVariable int userId,
                                                                @RequestParam(defaultValue = "1") int page,
                                                                @RequestParam(defaultValue = "5") int pageSize) {
        try {
            Page<UserExpense> expenseHistory = userExpenseService.getUserExpenseListByUserId(userId, page, pageSize);
            return ResponseEntity.ok(expenseHistory);
        } catch (Exception ex) {
            throw new AppException("Error fetching expense history", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/expense/list/{userId}")
    public ResponseEntity<List<UserExpense>> getExpenseListByUserId(@PathVariable int userId) {
        try {
            List<UserExpense> expenseList = userExpenseService.getAllExpensesByUserId(userId);
            return ResponseEntity.ok(expenseList);
        } catch (Exception ex) {
            throw new AppException("Error fetching expense list", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/expense/create/{userId}")
    public ResponseEntity<String> addUserExpenseById(@PathVariable int userId, @RequestBody UserExpense userExpense) {
        try {
            userExpenseService.addUserExpense(userId, userExpense);
            return ResponseEntity.ok("Expense Added");
        } catch (Exception ex) {
            throw new AppException("Error adding expense", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/expense/update/{expenseId}")
    public ResponseEntity<String> updateUserExpenseById(@PathVariable int expenseId, @RequestBody UserExpense userExpense) {
        try {
            userExpenseService.updateUserExpense(expenseId, userExpense);
            return ResponseEntity.ok("Expense Updated");
        } catch (Exception ex) {
            throw new AppException("Error updating expense", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/expense/delete/{expenseId}")
    public ResponseEntity<String> deleteUserExpenseById(@PathVariable int expenseId) {
        try {
            userExpenseService.deleteUserExpense(expenseId);
            return ResponseEntity.ok("Expense Deleted");
        } catch (Exception ex) {
            throw new AppException("Error deleting expense", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/expense/{expenseId}")
    public ResponseEntity<UserExpense> getUserExpenseById(@PathVariable int expenseId) {
        try {
            UserExpense userExpense = userExpenseService.getUserExpenseById(expenseId);
            if (userExpense == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(userExpense);
        } catch (Exception ex) {
            throw new AppException("Error fetching expense by ID", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
