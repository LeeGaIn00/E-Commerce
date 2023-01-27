package com.ecomm.back.controller;

import com.ecomm.back.dto.ChangePasswordRequestDto;
import com.ecomm.back.dto.MemberRequestDto;
import com.ecomm.back.dto.MemberResponseDto;
import com.ecomm.back.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/me")
    public ResponseEntity<MemberResponseDto> getMyMemberInfo() {
        MemberResponseDto myInfoBySecurity = memberService.getMyInfoBySecurity();
        return ResponseEntity.ok((myInfoBySecurity));
    }

    @GetMapping("/check/id/{id}")
    public ResponseEntity<?> checkId(@PathVariable("id") String id) {
        return ResponseEntity.status(HttpStatus.OK).body(memberService.checkId(id));
    }

    @GetMapping("/check/email/{email}")
    public ResponseEntity<?> checkEmail(@PathVariable("email") String email) {
        return ResponseEntity.status(HttpStatus.OK).body(memberService.checkEmail(email));
    }

    @PostMapping("/password")
    public ResponseEntity<MemberResponseDto> setMemberPassword(@RequestBody ChangePasswordRequestDto request) {
        return ResponseEntity.ok(memberService.changeMemberPassword(request.getExPassword(), request.getNewPassword()));
    }

    @PostMapping("/email")
    public ResponseEntity<MemberResponseDto> setMemberEmail(@RequestBody MemberRequestDto request) {
        return ResponseEntity.ok(memberService.changeMemberEmail(request.getEmail()));
    }

    @PostMapping("/name")
    public ResponseEntity<MemberResponseDto> setMemberName(@RequestBody MemberRequestDto request) {
        return ResponseEntity.ok(memberService.changeMemberName(request.getName()));
    }

    @PostMapping("/address")
    public ResponseEntity<MemberResponseDto> setMemberAddress(@RequestBody MemberRequestDto request) {
        return ResponseEntity.ok(memberService.changeMemberAddress(request.getAddress()));
    }

    @PostMapping("/phone")
    public ResponseEntity<MemberResponseDto> setMemberPhone(@RequestBody MemberRequestDto request) {
        return ResponseEntity.ok(memberService.changeMemberPhone(request.getPhone()));
    }
}