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
public class ProductDto {
    private Integer id;
    private String name;
    private Integer price;
    private Integer discount;
    private String image;
    private String detail;
    private String option1;
    private String option2;

    public static ProductDto of(Product product) {
        return ProductDto.builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .discount(product.getDiscount())
                .image(product.getImage())
                .detail(product.getDetail())
                .option1(product.getOption1())
                .option2(product.getOption2())
                .build();
    }
}
