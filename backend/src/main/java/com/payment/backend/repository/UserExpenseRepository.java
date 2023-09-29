package com.payment.backend.repository;

import com.payment.backend.entities.UserExpense;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserExpenseRepository extends JpaRepository<UserExpense, Integer> {

    List<UserExpense> findByUserMaster_UserId(int userId);

    Page<UserExpense> findByUserMaster_UserId(int userId, Pageable pageable);

    List<UserExpense> findTop5ByUserMasterUserIdOrderByExpenseDateDesc(int userId);
}
