package com.yazzer.banking.dto;

import com.yazzer.banking.models.Role;
import com.yazzer.banking.models.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class RoleDto {

    private Integer id;

    private String name;

    private Integer userId;

    public static RoleDto fromEntity(Role role) {
        if (role == null) {
            return null;
            // TODO throw an exception
        }
        return RoleDto.builder()
                .id(role.getId())
                .name(role.getName())
                .userId(role.getUser().getId())
                .build();
    }

    public static Role toEntity(RoleDto roleDto) {
        if (roleDto == null) {
            return null;
            // TODO throw an exception
        }
        return Role.builder()
                .id(roleDto.getId())
                .name(roleDto.getName())
                .user(
                        User.builder()
                                .id(roleDto.getUserId())
                                .build()
                )
                .build();
    }

}
