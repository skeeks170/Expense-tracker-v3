package com.payment.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserMasterDTO {

    private int userId;
    private String userFirstName;
    private String userLastName;
    private String userEmail;
    private String userUsername;
    private String userPassword;
    private Double userSalary;

    private String token;
}