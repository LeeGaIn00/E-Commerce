package com.ecomm.back.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
}
