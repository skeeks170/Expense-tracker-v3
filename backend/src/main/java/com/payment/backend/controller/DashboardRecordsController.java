package com.payment.backend.controller;

import com.payment.backend.dto.DashboardRecordsDTO;
import com.payment.backend.exception.AppException;
import com.payment.backend.service.DashboardRecordsServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/dashboard/")
public class DashboardRecordsController {

    @Autowired
    DashboardRecordsServices recordsServices;

    @GetMapping("transactionHistory/{userId}")
    public ResponseEntity<List<DashboardRecordsDTO>> fetchLastFive(@PathVariable int userId) {
        try {
            List<DashboardRecordsDTO> records = recordsServices.getAllTransactionHistory(userId);
            return ResponseEntity.ok(records);
        } catch (Exception ex) {
            throw new AppException("Error fetching transaction history", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
