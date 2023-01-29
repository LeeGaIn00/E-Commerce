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
        System.out.println(wishlistRepository.save(wish));
        return wishlistRepository.save(wish);
    }

    /* 찜한 상품(my page에서 찜한 목록 나타내기 위함) */
    public ResponseEntity<List<Product>> getLike(String memberId) {
        List<Product> product = wishlistRepository.findByMemberId(memberId);

        return ResponseEntity.ok(product);
    }

    /* 찜 취소한 상품 테이블에서 삭제 */
    public ResponseEntity<Map<String, Boolean>> deleteLike(String memberId, Integer productId) {
        Wishlist wish = wishlistRepository.findById(new WishlistId(memberId, productId))
                .orElseThrow(() -> new ResourceNotFoundException("Not exist Wishlist Data by : [" + memberId + "]"));

        wishlistRepository.delete(wish);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Canceled Wishlist by id : [" + memberId  + ", " + productId + "]", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
