package com.ecomm.back.controller;

import com.ecomm.back.dto.ReviewRequestDto;
import com.ecomm.back.dto.ReviewResponseDto;
import com.ecomm.back.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/review")
public class ReviewController {
    private final ReviewService reviewService;

    @GetMapping("/list/{productId}")
    public List<ReviewResponseDto> getReviewList(@PathVariable Integer productId) {
        return reviewService.getReviewList(productId);
    }

    @PostMapping("")
    public ResponseEntity<ReviewResponseDto> createReview(@RequestBody ReviewRequestDto reviewRequestDto) {
        return new ResponseEntity<>(reviewService.createReview(reviewRequestDto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReviewResponseDto> updateReview(@PathVariable Integer id, @RequestBody ReviewRequestDto reviewRequestDto) {
        return new ResponseEntity<>(reviewService.updateReview(id, reviewRequestDto), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteReview(@PathVariable Integer id) {
        return reviewService.deleteReview(id);
    }

    @GetMapping("/myreview/{memberId}")
    public List<ReviewResponseDto> getMyReview(@PathVariable String memberId) {
        return reviewService.getMyReview(memberId);
    }

}
