package com.ecomm.back.service;

import com.ecomm.back.dto.MemberResponseDto;
import com.ecomm.back.model.Member;
import com.ecomm.back.repository.MemberRepository;
import com.ecomm.back.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public MemberResponseDto getMyInfoBySecurity() {
        return memberRepository.findById(SecurityUtil.getCurrentMemberId())
                .map(MemberResponseDto::of)
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
    }

    public boolean checkId(String id) {
        return memberRepository.existsById(id);
    }

    public boolean checkEmail(String email) {
        return memberRepository.existsByEmail(email);
    }

//    @Transactional
//    public MemberResponseDto changeMemberName(String email, String nickname) {
//        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
//        member.setName(nickname);
//        return MemberResponseDto.of(memberRepository.save(member));
//    }

    @Transactional(rollbackFor = Exception.class)
    public MemberResponseDto changeMemberPassword(String exPassword, String newPassword) {
        Member member = memberRepository.findById(SecurityUtil.getCurrentMemberId()).orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
        if(!passwordEncoder.matches(exPassword, member.getPassword())) {
            throw new RuntimeException("비밀번호가 맞지 않습니다");
        }
        member.setPassword(passwordEncoder.encode((newPassword)));
        return MemberResponseDto.of(memberRepository.save(member));
    }
}