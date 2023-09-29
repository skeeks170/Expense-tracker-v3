package com.payment.backend.mapper;

import com.payment.backend.dto.UserMasterDTO;
import com.payment.backend.dto.RegisterDto;
import com.payment.backend.entities.UserMaster;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface userMasterMapper {

    @Mapping(target = "token", ignore = true)
    UserMasterDTO userMasterToDTO(UserMaster userMaster);

    @Mapping(target = "userPassword", ignore = true)
    UserMaster getUser(RegisterDto registerDTO);
}