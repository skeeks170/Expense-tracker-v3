package com.payment.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(uniqueConstraints = { @UniqueConstraint(columnNames = { "userUsername", "userEmail" }) })
public class UserMaster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;
    private String userFirstName;
    private String userLastName;
    private String userEmail;
    private String userUsername;
    private String userPassword;
    private Double userSalary;

    @OneToMany(mappedBy = "userMaster", cascade = CascadeType.ALL)
    private List<UserIncome> userIncome = new ArrayList<>();

    @OneToMany(mappedBy = "userMaster", cascade = CascadeType.ALL)
    private List<UserExpense> userExpense = new ArrayList<>();
}
