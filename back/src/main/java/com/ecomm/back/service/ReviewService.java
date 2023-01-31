package com.ecomm.back.service;

import com.ecomm.back.dto.MyReviewDto;
import com.ecomm.back.dto.ReviewRequestDto;
import com.ecomm.back.dto.ReviewResponseDto;
import com.ecomm.back.exception.ResourceNotFoundException;
import com.ecomm.back.model.Member;
import com.ecomm.back.model.Product;
import com.ecomm.back.model.Review;
import com.ecomm.back.repository.MemberRepository;
import com.ecomm.back.repository.ProductRepository;
import com.ecomm.back.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;
    private final MemberRepository memberRepository;

    public List<ReviewResponseDto> getReviewList(Integer productId) {
        List<ReviewResponseDto> reviewDtoList = reviewRepository.findByProductId(productId)
                .stream()
                .map(review-> ReviewResponseDto.of(review))
                .collect(Collectors.toList());

        return reviewDtoList;
    }

    public List<MyReviewDto> getMyReview(String memberId) {
        List<MyReviewDto> reviewDtoList = reviewRepository.findByMemberId(memberId)
                .stream()
                .map(review-> MyReviewDto.of(review))
                .collect(Collectors.toList());

        return reviewDtoList;
    }

    public ReviewResponseDto createReview(ReviewRequestDto reviewRequestDto) {
        Review review = reviewRequestDto.toReview();
        Optional<Product> product = productRepository.findById(reviewRequestDto.getProductId());
        Optional<Member> member = memberRepository.findById(reviewRequestDto.getMemberId());

        product.ifPresent(re->{        // null이 아닌 경우 코드 실행
            review.changeProduct(re);
        });
        member.ifPresent(re->{
            review.changeMember(re);
        });

        return ReviewResponseDto.of(reviewRepository.save(review));
    }

    public ReviewResponseDto updateReview(Integer id, ReviewRequestDto reviewRequestDto) {
        String status;
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Not exist Review Data by id : [" + id + "]"));

        review.update(reviewRequestDto.getContent(), reviewRequestDto.getImage(), reviewRequestDto.getStar());

        return ReviewResponseDto.of(reviewRepository.save(review));
    }

    public ResponseEntity<Map<String, Boolean>> deleteReview(Integer id) {
        reviewRepository.deleteById(id);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Deleted Review Data by id : [" + id + "]", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
