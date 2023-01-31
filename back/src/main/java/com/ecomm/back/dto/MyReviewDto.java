package com.ecomm.back.dto;

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
public class MyReviewDto {
    private String content;
    private Integer star;
    private List<String> r_image;
    private Date createdTime;
    private Integer id;
    private String name;
    private String p_image;

    public static MyReviewDto of(Review review) {
        return MyReviewDto.builder()
                .content(review.getContent())
                .star(review.getStar())
                .r_image(review.getImageList())
                .createdTime(review.getCreatedTime())
                .id(review.getProduct().getId())
                .name(review.getProduct().getName())
                .p_image(review.getProduct().getImage())
                .build();
    }
}
