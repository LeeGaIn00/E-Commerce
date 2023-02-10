package com.ecomm.back.dto;

import com.ecomm.back.model.Authority;
import com.ecomm.back.model.Cart;
import com.ecomm.back.model.Inquiry;
import com.ecomm.back.model.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CartRequestDto {
    private String memberId;
    private Integer productId;
    private String op1;
    private String op2;
    private Integer quantity;

    public Cart toCart() {
        return Cart.builder()
                .quantity(quantity)
                .build();
    }
}
