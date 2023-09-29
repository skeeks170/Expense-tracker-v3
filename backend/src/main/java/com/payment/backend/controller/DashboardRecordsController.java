package com.payment.backend.controller;

import com.payment.backend.dto.DashboardRecordsDTO;
import com.payment.backend.service.DashboardRecordsServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/dashboard/")
public class DashboardRecordsController {

    @Autowired
    DashboardRecordsServices recordsServices;

    @GetMapping("lastFive/{userId}")
    public List<DashboardRecordsDTO> fetchLastFive(@PathVariable int userId){
        return recordsServices.getLastFiveFromDB(userId);
    }
}
