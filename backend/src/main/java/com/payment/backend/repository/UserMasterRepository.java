package com.payment.backend.repository;

import com.payment.backend.entities.UserMaster;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserMasterRepository extends JpaRepository<UserMaster, Integer> {
    UserMaster findByUserUsername(String userUsername);

}