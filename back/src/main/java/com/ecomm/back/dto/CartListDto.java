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
    private Integer id;
    private Integer productId;
    private Integer optionsId;
    private String op1;
    private String op2;
    private Integer quantity;
    private String productName;
    private Integer price;
    private String p_image;

    public static CartListDto of(Cart cart) {
        return CartListDto.builder()
                .id(cart.getId())
                .productId(cart.getProduct().getId())
                .optionsId(cart.getChoice().getId())
                .quantity(cart.getQuantity())
                .op1(cart.getChoice().getOption1())
                .op2(cart.getChoice().getOption2())
                .price(cart.getProduct().getDiscount())
                .productName(cart.getProduct().getName())
                .p_image(cart.getProduct().getImage())
                .build();
    }
}
