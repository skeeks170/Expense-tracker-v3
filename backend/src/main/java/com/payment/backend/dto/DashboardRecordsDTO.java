package com.payment.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardRecordsDTO {

    private Date transactionDate;
    private Double transactionAmount;
    private String transactionDescription;
    private String transactionCategory;
    private String transactionType; //expense or income type

}
