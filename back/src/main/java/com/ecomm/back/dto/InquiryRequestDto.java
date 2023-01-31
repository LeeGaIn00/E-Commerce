package com.ecomm.back.dto;

import com.ecomm.back.model.Inquiry;
import lombok.Getter;

@Getter
public class InquiryRequestDto {
    private String type;
    private String title;
    private String content;
    private String image;
    private Boolean secret;
    private Integer productId;
    private String memberId;

    public Inquiry toInquiry() {
        return Inquiry.builder()
                .type(type)
                .title(title)
                .content(content)
                .image(image)
                .secret(secret)
                .build();
    }
}
