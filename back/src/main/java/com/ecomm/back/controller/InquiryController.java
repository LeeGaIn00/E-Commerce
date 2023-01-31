package com.ecomm.back.controller;

import com.ecomm.back.dto.InquiryRequestDto;
import com.ecomm.back.dto.InquiryResponseDto;
import com.ecomm.back.service.InquiryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/inquiry")
public class InquiryController {
    private final InquiryService inquiryService;

    @GetMapping("/list/{productId}")
    public List<InquiryResponseDto> getInquiryList(@PathVariable Integer productId) {
        return inquiryService.getInquiryList(productId);
    }

    @PostMapping("")
    public ResponseEntity<InquiryResponseDto> createInquiry(@RequestBody InquiryRequestDto inquiryRequestDto) {
        return new ResponseEntity<>(inquiryService.createInquiry(inquiryRequestDto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<InquiryResponseDto> updateInquiry(@PathVariable Integer id, @RequestBody InquiryRequestDto inquiryRequestDto) {
        return new ResponseEntity<>(inquiryService.updateInquiry(id, inquiryRequestDto), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteInquiry(@PathVariable Integer id) {
        return inquiryService.deleteInquiry(id);
    }
}
