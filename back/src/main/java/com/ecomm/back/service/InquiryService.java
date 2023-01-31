package com.ecomm.back.service;

import com.ecomm.back.dto.InquiryRequestDto;
import com.ecomm.back.dto.InquiryResponseDto;
import com.ecomm.back.exception.ResourceNotFoundException;
import com.ecomm.back.model.Inquiry;
import com.ecomm.back.model.Member;
import com.ecomm.back.model.Product;
import com.ecomm.back.repository.InquiryRepository;
import com.ecomm.back.repository.MemberRepository;
import com.ecomm.back.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InquiryService {
    private final InquiryRepository inquiryRepository;
    private final ProductRepository productRepository;
    private final MemberRepository memberRepository;

    public List<InquiryResponseDto> getInquiryList(Integer productId) {
        List<InquiryResponseDto> inquiryDtoList = inquiryRepository.findByProductId(productId)
                .stream()
                .map(inquiry-> InquiryResponseDto.of(inquiry))
                .collect(Collectors.toList());

        return inquiryDtoList;
    }

    public InquiryResponseDto createInquiry(InquiryRequestDto inquiryRequestDto) {
        Inquiry inquiry = inquiryRequestDto.toInquiry();
        Optional<Product> product = productRepository.findById(inquiryRequestDto.getProductId());
        Optional<Member> member = memberRepository.findById(inquiryRequestDto.getMemberId());

        product.ifPresent(re->{        // null이 아닌 경우 코드 실행
            inquiry.changeProduct(re);
        });
        member.ifPresent(re->{
            inquiry.changeMember(re);
        });

        return InquiryResponseDto.of(inquiryRepository.save(inquiry));
    }

    public InquiryResponseDto updateInquiry(Integer id, InquiryRequestDto inquiryRequestDto) {
        Inquiry inquiry = inquiryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Not exist Inquiry Data by id : [" + id + "]"));

        inquiry.update(inquiryRequestDto.getType(),
                inquiryRequestDto.getTitle(),
                inquiryRequestDto.getContent(),
                inquiryRequestDto.getImage(),
                inquiryRequestDto.getSecret());

        return InquiryResponseDto.of(inquiryRepository.save(inquiry));
    }

    public ResponseEntity<Map<String, Boolean>> deleteInquiry(Integer id) {
        inquiryRepository.deleteById(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Deleted Inquiry Data by id : [" + id + "]", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
