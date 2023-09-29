package com.payment.backend.service;

import com.payment.backend.entities.UserMaster;
import com.payment.backend.entities.UserIncome;
import com.payment.backend.repository.UserIncomeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserIncomeService {

    @Autowired
    private UserIncomeRepository userIncomeRepository;

    @Autowired
    private UserMasterService userMasterService;

    public Page<UserIncome> getUserIncomeListByUserId(int userId, int page, int pageSize) {
        Pageable pageable = PageRequest.of(page - 1, pageSize); // Page numbers start from 0 in Spring Data JPA
        return userIncomeRepository.findByUserMaster_UserId(userId, pageable);
    }

    public List<UserIncome> getAllIncomeByUserId(int userId) {
        return userIncomeRepository.findByUserMaster_UserId(userId);
    }

    public void addUserIncome(int userId, UserIncome userIncome) {
        UserMaster userMaster = userMasterService.getUserById(userId);
        userIncome.setUserMaster(userMaster);
        userIncomeRepository.save(userIncome);
    }

    public void updateUserIncome(int incomeId, UserIncome updatedUserIncome) {
        UserIncome existingUserIncome = userIncomeRepository.findById(incomeId).orElse(null);
        if (existingUserIncome != null) {
            existingUserIncome.setIncomeDate(updatedUserIncome.getIncomeDate());
            existingUserIncome.setIncomeAmount(updatedUserIncome.getIncomeAmount());
            existingUserIncome.setIncomeDescription(updatedUserIncome.getIncomeDescription());
            existingUserIncome.setIncomeCategory(updatedUserIncome.getIncomeCategory());

            userIncomeRepository.save(existingUserIncome);
        }
    }

    public void deleteUserIncome(int incomeId) {
        userIncomeRepository.deleteById(incomeId);
    }

    public UserIncome getUserIncomeById(int incomeId) {
        return userIncomeRepository.findById(incomeId).orElse(null);
    }
}

