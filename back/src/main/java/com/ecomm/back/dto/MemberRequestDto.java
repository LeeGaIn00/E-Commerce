package com.ecomm.back.dto;

import com.ecomm.back.model.Authority;
import com.ecomm.back.model.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberRequestDto {
    private String id;
    private String password;
    private String email;
    private String name;
    private String address;
    private String phone;

    public Member toMember(PasswordEncoder passwordEncoder) {
        return Member.builder()
                .id(id)
                .password(passwordEncoder.encode(password))
                .email(email)
                .name(name)
                .address(address)
                .phone(phone)
                .authority(Authority.ROLE_USER)
                .build();
    }

    public UsernamePasswordAuthenticationToken toAuthentication() {
        return new UsernamePasswordAuthenticationToken(id, password);
    }
}