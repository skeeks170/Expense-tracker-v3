package com.payment.backend.service;

import com.payment.backend.dto.DashboardRecordsDTO;
import com.payment.backend.entities.UserExpense;
import com.payment.backend.entities.UserIncome;
import com.payment.backend.repository.UserExpenseRepository;
import com.payment.backend.repository.UserIncomeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DashboardRecordsServices {

    @Autowired
    private UserIncomeRepository userIncomeRepository;

    @Autowired
    private UserExpenseRepository userExpenseRepository;

    public List<DashboardRecordsDTO> getAllTransactionHistory(int userId) {

        List<UserIncome> lastFiveIncomes = userIncomeRepository
                .findTop5ByUserMasterUserIdOrderByIncomeDateDesc(userId);

        List<UserExpense> lastFiveExpenses = userExpenseRepository
                .findTop5ByUserMasterUserIdOrderByExpenseDateDesc(userId);

        List<DashboardRecordsDTO> dashboardRecords = lastFiveIncomes.stream()
                .map(this::mapUserIncomeToDashboardRecordDTO)
                .collect(Collectors.toList());

        dashboardRecords.addAll(lastFiveExpenses.stream()
                .map(this::mapUserExpenseToDashboardRecordDTO)
                .toList());

        dashboardRecords.sort(Comparator.comparing(DashboardRecordsDTO::getTransactionDate).reversed());

        return dashboardRecords;
    }

    public DashboardRecordsDTO mapUserIncomeToDashboardRecordDTO(UserIncome userIncome) {
        DashboardRecordsDTO dto = new DashboardRecordsDTO();
        dto.setTransactionDate(userIncome.getIncomeDate());
        dto.setTransactionAmount(userIncome.getIncomeAmount());
        dto.setTransactionDescription(userIncome.getIncomeDescription());
        dto.setTransactionCategory(userIncome.getIncomeCategory());
        dto.setTransactionType("Income"); // Set transactionType to "Income" for income transactions
        return dto;
    }

    public DashboardRecordsDTO mapUserExpenseToDashboardRecordDTO(UserExpense userExpense) {
        DashboardRecordsDTO dto = new DashboardRecordsDTO();
        dto.setTransactionDate(userExpense.getExpenseDate());
        dto.setTransactionAmount(userExpense.getExpenseAmount());
        dto.setTransactionDescription(userExpense.getExpenseDescription());
        dto.setTransactionCategory(userExpense.getExpenseCategory());
        dto.setTransactionType("Expense"); // Set transactionType to "Expense" for expense transactions
        return dto;
    }


}
