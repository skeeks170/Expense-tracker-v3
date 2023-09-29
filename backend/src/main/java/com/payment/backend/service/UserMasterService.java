package com.payment.backend.service;


import com.payment.backend.dto.UserMasterDTO;
import com.payment.backend.dto.LoginDTO;
import com.payment.backend.dto.RegisterDto;
import com.payment.backend.entities.UserMaster;
import com.payment.backend.exception.AppException;
import com.payment.backend.mapper.userMasterMapper;
import com.payment.backend.repository.UserMasterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.CharBuffer;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserMasterService {

    private final UserMasterRepository userMasterRepository;
    private final userMasterMapper userMasterMapper;
    private final PasswordEncoder passwordEncoder;

    public List<UserMaster> getAllEmployees() {
        return userMasterRepository.findAll();
    }

    public void register(RegisterDto registerDTO) {

        UserMaster checkEmployee = userMasterRepository.findByUserUsername(registerDTO.userUsername());

        if(checkEmployee != null) {
            throw new AppException("User already Exists", HttpStatus.BAD_REQUEST);
        }

        UserMaster userMaster = userMasterMapper.getUser(registerDTO);
        userMaster.setUserPassword(passwordEncoder.encode(CharBuffer.wrap(registerDTO.userPassword())));

        userMaster.setUserFirstName(registerDTO.userFirstName());
        userMaster.setUserLastName(registerDTO.userLastName());

        userMasterRepository.save(userMaster);
    }

    public UserMasterDTO login(LoginDTO loginDTO) throws RuntimeException {
        UserMaster userMaster = userMasterRepository.findByUserUsername(loginDTO.userUsername());

        if(passwordEncoder.matches(CharBuffer.wrap(loginDTO.userPassword()), userMaster.getUserPassword())) {
            return userMasterMapper.userMasterToDTO(userMaster);
        }

        throw new AppException("Invalid Password", HttpStatus.BAD_REQUEST);
    }

    public UserMaster getUserById(int userId) {
        return userMasterRepository.findById(userId)
                .orElseThrow(() -> new AppException("User not found in Data Base", HttpStatus.BAD_REQUEST));
    }

    public UserMasterDTO mapToDTO(UserMaster userMaster) {
        UserMasterDTO userMasterDTO = new UserMasterDTO();
        userMasterDTO.setUserFirstName(userMaster.getUserFirstName());
        userMasterDTO.setUserLastName(userMaster.getUserLastName());
        userMasterDTO.setUserEmail(userMaster.getUserEmail());
        userMasterDTO.setUserSalary(userMaster.getUserSalary());

        return userMasterDTO;
    }

    public UserMasterDTO getUserDTOById(int userId) {
        UserMaster userMaster = userMasterRepository.findById(userId)
                .orElseThrow(() -> new AppException("User not found in Database", HttpStatus.BAD_REQUEST));

        return mapToDTO(userMaster);
    }
}
