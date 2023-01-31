package com.ecomm.back.controller;

import com.ecomm.back.dto.Product;
import com.ecomm.back.dto.ProductDto;
import com.ecomm.back.dto.ProductListDto;
import com.ecomm.back.model.Wishlist;
import com.ecomm.back.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/wishlist")
public class WishlistController {

    private final WishlistService wishlistService;

    /* 찜 추가 */
    @PostMapping("/{memberId}/{productId}")
    public Wishlist createLike(@PathVariable String memberId, @PathVariable Integer productId) {
        return wishlistService.createLike(memberId, productId);
    }

    /* 찜 취소 */
    @DeleteMapping("")
    public ResponseEntity<Map<String, Boolean>> deleteLike(
            @RequestParam(value = "memberId", required = true) String memberId,
            @RequestParam(value = "productId", required = true) Integer productId) {
        return wishlistService.deleteLike(memberId, productId);
    }

    /* 카테고리별 상품 불러오기 */
    @GetMapping("/{memberId}")
    public ResponseEntity<List<Product>> getWishlist(@PathVariable String memberId) {
        return wishlistService.getLike(memberId);
    }
}
