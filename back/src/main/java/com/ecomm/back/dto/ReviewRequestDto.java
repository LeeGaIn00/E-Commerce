package com.ecomm.back.dto;

import com.ecomm.back.model.Review;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReviewRequestDto {
    private String content;
    private String image;
    private Integer star;
    private Integer productId;
    private String memberId;

    public Review toReview() {
        return Review.builder()
                .content(content)
                .image(image)
                .star(star)
                .build();
    }
}

