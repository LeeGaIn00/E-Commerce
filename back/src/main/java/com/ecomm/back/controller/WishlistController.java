package com.ecomm.back.controller;

import com.ecomm.back.dto.Product;
import com.ecomm.back.model.Wishlist;
import com.ecomm.back.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("")
public class WishlistController {

    private final WishlistService wishlistService;

    /* 찜 추가 */
    @PostMapping("/wishlist/{memberId}/{productId}")
    public Wishlist createLike(@PathVariable String memberId, @PathVariable Integer productId) {
        return wishlistService.createLike(memberId, productId);
    }

    /* 찜 취소 */
    @DeleteMapping("/wishlist/{memberId}/{productId}")
    public ResponseEntity<Map<String, Boolean>> deleteLike(@PathVariable String memberId,
                                                           @PathVariable Integer productId) {
        return wishlistService.deleteLike(memberId, productId);
    }

    /* 찜 누른 상품 아이디 */
    @GetMapping("/shop/{categoryId}")
    public ResponseEntity<List<Integer>> getWishId(@PathVariable String categoryId,
                                   @RequestParam String memberId) {
        return wishlistService.getWishId(memberId);
    }


    /* 카테고리별 상품 불러오기 */
    @GetMapping("/wishlist/{memberId}")
    public List<Product> getWishlist(@PathVariable String memberId) {
        return wishlistService.getWishlist(memberId);
    }
}
