package com.ecomm.back.dto;

import com.ecomm.back.model.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductListDto {
    private Integer id;
    private String name;
    private Integer price;
    private Integer discount;
    private String image;

    public static ProductListDto of(Product product) {
        return ProductListDto.builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .discount(product.getDiscount())
                .image(product.getImage())
                .build();
    }
}
