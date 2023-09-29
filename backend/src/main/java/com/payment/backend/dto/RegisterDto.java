package com.payment.backend.dto;

public record RegisterDto(
        String userFirstName,
        String userLastName,
        String userEmail,
        String userUsername,
        String userPassword,
        Double userSalary) {
}