package com.ecomm.back.dto;

import com.ecomm.back.model.Inquiry;
import com.ecomm.back.model.Review;
import lombok.Builder;
import lombok.Getter;

import java.util.Date;
import java.util.List;

@Getter
@Builder
public class InquiryResponseDto {
    private Integer id;
    private String type;
    private String title;
    private String content;
    private List<String> image;
    private Boolean secret;
    private String answer;
    private Date createdTime;
    private Integer productId;
    private String memberId;

    public static InquiryResponseDto of(Inquiry inquiry) {
        return InquiryResponseDto.builder()
                .id(inquiry.getId())
                .type(inquiry.getType())
                .title(inquiry.getTitle())
                .content(inquiry.getContent())
                .image(inquiry.getImageList())
                .secret(inquiry.getSecret())
                .answer(inquiry.getAnswer())
                .createdTime(inquiry.getCreatedTime())
                .productId(inquiry.getProduct().getId())
                .memberId(inquiry.getMember().getId())
                .build();
    }
}
