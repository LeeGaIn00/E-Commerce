package com.ecomm.back.service;

import com.ecomm.back.dto.Product;
import com.ecomm.back.exception.ResourceNotFoundException;
import com.ecomm.back.model.Wishlist;
import com.ecomm.back.model.WishlistId;
import com.ecomm.back.repository.WishlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class WishlistService {

    private final WishlistRepository wishlistRepository;

    /* 찜한 상품 테이블에 추가 */
    @Transactional
    public Wishlist createLike(String memberId, Integer productId) {
        Wishlist wish = new Wishlist(memberId, productId);
        return wishlistRepository.save(wish);
    }

    /* 찜한 상품(my page에서 찜한 목록 나타내기 위함) */
    public ResponseEntity<List<Integer>> getWishId(String memberId) {
        List<Integer> idList = wishlistRepository.findWishId(memberId);

        return ResponseEntity.ok(idList);
    }

    /* 찜 취소한 상품 테이블에서 삭제 */
    @Transactional
    public ResponseEntity<Map<String, Boolean>> deleteLike(String memberId, Integer productId) {
        Wishlist wish = wishlistRepository.findById(new WishlistId(memberId, productId))
                .orElseThrow(() -> new ResourceNotFoundException("Not exist Wishlist Data by : [" + memberId + "]"));

        wishlistRepository.delete(wish);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Canceled Wishlist by id : [" + memberId  + ", " + productId + "]", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    public List<Product> getWishlist(String memberId) {
        return wishlistRepository.findByMemberId(memberId);
    }
}
