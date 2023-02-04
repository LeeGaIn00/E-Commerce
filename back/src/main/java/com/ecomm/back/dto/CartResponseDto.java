package com.ecomm.back.dto;

import com.ecomm.back.model.Cart;
import com.ecomm.back.model.Review;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CartResponseDto {
    private String memberId;
    private Integer productId;
    private Integer optionsId;
    private Integer quantity;

    public static CartResponseDto of(Cart cart) {
        return CartResponseDto.builder()
                .memberId(cart.getMember().getId())
                .productId(cart.getProduct().getId())
                .optionsId(cart.getOptionsId())
                .quantity(cart.getQuantity())
                .build();
    }
}
