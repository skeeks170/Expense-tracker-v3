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
public class UserExpense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int expenseId;
    private Date expenseDate;
    private Double expenseAmount;
    private String expenseDescription;
    private String expenseCategory;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserMaster userMaster;
}
