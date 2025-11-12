package com.yazzer.banking.services;

import com.yazzer.banking.dto.AuthenticationRequest;
import com.yazzer.banking.dto.AuthenticationResponse;
import com.yazzer.banking.dto.UserDto;

public interface UserService extends AbstractService <UserDto> {

    Integer validateAccount(Integer id);

    Integer invalidateAccount(Integer id);

    AuthenticationResponse register(UserDto user);

    AuthenticationResponse login(AuthenticationRequest request);
}
