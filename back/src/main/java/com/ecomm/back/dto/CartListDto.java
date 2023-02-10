package com.ecomm.back.dto;

import com.ecomm.back.model.Cart;
import com.ecomm.back.model.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartListDto {
    private Integer productId;
    private Integer optionsId;
    private Integer quantity;
    private String productName;
    private String p_image;

    public static CartListDto of(Cart cart) {
        return CartListDto.builder()
                .productId(cart.getProduct().getId())
                .optionsId(cart.getChoice().getId())
                .quantity(cart.getQuantity())
                .productName(cart.getProduct().getName())
                .p_image(cart.getProduct().getImage())
                .build();
    }
}
