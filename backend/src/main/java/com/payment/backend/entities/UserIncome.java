package com.payment.backend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserIncome {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int incomeId;
    private Date incomeDate;
    private Double incomeAmount;
    private String incomeDescription;
    private String incomeCategory;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserMaster userMaster;
}