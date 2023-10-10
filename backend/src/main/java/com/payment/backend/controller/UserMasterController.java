package com.payment.backend.controller;

import com.payment.backend.config.UserAuthProvider;
import com.payment.backend.dto.UserMasterDTO;
import com.payment.backend.dto.LoginDTO;
import com.payment.backend.dto.RegisterDto;
import com.payment.backend.entities.UserMaster;
import com.payment.backend.exception.AppException;
import com.payment.backend.service.UserMasterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class UserMasterController {

    private final UserMasterService userMasterService;
    private final UserAuthProvider userAuthProvider;

    @GetMapping("/employee/all")
    public ResponseEntity<List<UserMaster>> getAllEmployees() {
        try {
            List<UserMaster> employees = userMasterService.getAllEmployees();
            return ResponseEntity.ok(employees);
        } catch (Exception ex) {
            throw new AppException("Error fetching employees", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerEmployee(@RequestBody RegisterDto registerDTO) {
        try {
            userMasterService.register(registerDTO);
            return ResponseEntity.ok("Registered Successfully");
        } catch (Exception ex) {
            throw new AppException("Error registering employee", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<UserMasterDTO> loginEmployee(@RequestBody LoginDTO loginDTO) {
        try {
            UserMasterDTO userMasterDTO = userMasterService.login(loginDTO);
            userMasterDTO.setToken(userAuthProvider.createToken(userMasterDTO));
            return ResponseEntity.created(URI.create("/user/" + userMasterDTO.getUserId())).body(userMasterDTO);
        } catch (Exception ex) {
            throw new AppException("Error logging in", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("currentUser/{userId}")
    public UserMasterDTO getUserDTOById(@PathVariable int userId) {
        try {
            return userMasterService.getUserDTOById(userId);
        } catch (Exception ex) {
            throw new AppException("Error fetching user by ID", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
