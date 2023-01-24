package com.ecomm.back.dto;

import com.ecomm.back.model.Member;
import com.ecomm.back.model.Review;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReviewResponseDto {
    private Integer id;
    private String content;
    private List<String> image;
    private Integer star;
    private Date createdTime;
    private Integer productId;
    private String memberId;

    public static ReviewResponseDto of(Review review) {
        return ReviewResponseDto.builder()
                .id(review.getId())
                .content(review.getContent())
                .image(review.getImageList())
                .star(review.getStar())
                .createdTime(review.getCreatedTime())
                .productId(review.getProduct().getId())
                .memberId(review.getMember().getId())
                .build();
    }
}
