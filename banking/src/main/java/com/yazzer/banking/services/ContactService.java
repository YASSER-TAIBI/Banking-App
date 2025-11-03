package com.yazzer.banking.services;

import com.yazzer.banking.dto.ContactDto;

import java.util.List;

public interface ContactService extends AbstractService<ContactDto>{

    List<ContactDto> findAllByUserId(Integer userId);
}
