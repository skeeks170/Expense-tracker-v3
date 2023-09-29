package com.payment.backend.controller;

import com.payment.backend.config.UserAuthProvider;
import com.payment.backend.dto.UserMasterDTO;
import com.payment.backend.dto.LoginDTO;
import com.payment.backend.dto.RegisterDto;
import com.payment.backend.entities.UserMaster;
import com.payment.backend.service.UserMasterService;
import lombok.RequiredArgsConstructor;
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
    ResponseEntity<List<UserMaster>> getAllEmployees() {
        return ResponseEntity.ok(userMasterService.getAllEmployees());
    }

    @PostMapping("/register")
    ResponseEntity<String> registerEmployee(@RequestBody RegisterDto registerDTO) {
        userMasterService.register(registerDTO);
        return ResponseEntity.ok("Registered Successfully");
    }

    @PostMapping("/login")
    ResponseEntity<UserMasterDTO> loginEmployee(@RequestBody LoginDTO loginDTO) {
        UserMasterDTO userMasterDTO = userMasterService.login(loginDTO);
        userMasterDTO.setToken(userAuthProvider.createToken(userMasterDTO));
        return ResponseEntity.created(URI.create("/user/" + userMasterDTO.getUserId())).body(userMasterDTO);
    }

    @GetMapping("currentUser/{userId}")
    UserMasterDTO getUserDTOById(@PathVariable int userId) {
        return userMasterService.getUserDTOById(userId);
    }
}
