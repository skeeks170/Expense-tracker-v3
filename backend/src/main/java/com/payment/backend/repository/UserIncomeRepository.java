package com.payment.backend.repository;

import com.payment.backend.entities.UserIncome;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserIncomeRepository extends JpaRepository<UserIncome, Integer> {
    List<UserIncome> findByUserMaster_UserId(int userId);

    Page<UserIncome> findByUserMaster_UserId(int userId, Pageable pageable);

    List<UserIncome> findTop5ByUserMasterUserIdOrderByIncomeDateDesc(int userId);
}
