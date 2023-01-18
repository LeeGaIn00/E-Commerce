package com.ecomm.back.dto;

import com.ecomm.back.model.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberResponseDto {
    private String id;
    private String email;
    private String name;
    private String address;
    private String phone;

    public static MemberResponseDto of(Member member) {
        return MemberResponseDto.builder()
                .id(member.getId())
                .email(member.getEmail())
                .name(member.getName())
                .address(member.getAddress())
                .phone(member.getPhone())
                .build();
    }
}
