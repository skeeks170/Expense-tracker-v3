package com.payment.backend.service;

import com.payment.backend.entities.UserMaster;
import com.payment.backend.entities.UserExpense;
import com.payment.backend.repository.UserExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserExpenseService {

    @Autowired
    private UserExpenseRepository userExpenseRepository;

    @Autowired
    private UserMasterService userMasterService;

    public Page<UserExpense> getUserExpenseListByUserId(int userId, int page, int pageSize) {
        Pageable pageable = PageRequest.of(page - 1, pageSize); // Page numbers start from 0 in Spring Data JPA
        return userExpenseRepository.findByUserMaster_UserId(userId, pageable);
    }

    public List<UserExpense> getAllExpensesByUserId(int userId) {
        return userExpenseRepository.findByUserMaster_UserId(userId);
    }

    public void addUserExpense(int userId, UserExpense userExpense) {
        UserMaster userMaster = userMasterService.getUserById(userId);
        userExpense.setUserMaster(userMaster);
        userExpenseRepository.save(userExpense);
    }

    public void updateUserExpense(int expenseId, UserExpense updatedUserExpense) {
        UserExpense existingUserExpense = userExpenseRepository.findById(expenseId).orElse(null);
        if (existingUserExpense != null) {
            existingUserExpense.setExpenseDate(updatedUserExpense.getExpenseDate());
            existingUserExpense.setExpenseAmount(updatedUserExpense.getExpenseAmount());
            existingUserExpense.setExpenseDescription(updatedUserExpense.getExpenseDescription());
            existingUserExpense.setExpenseCategory(updatedUserExpense.getExpenseCategory());

            userExpenseRepository.save(existingUserExpense);
        }
    }

    public void deleteUserExpense(int expenseId) {
        userExpenseRepository.deleteById(expenseId);
    }

    public UserExpense getUserExpenseById(int expenseId) {
        return userExpenseRepository.findById(expenseId).orElse(null);
    }
}
