package com.ecomm.back.controller;

import com.ecomm.back.dto.ProductDto;
import com.ecomm.back.dto.ProductListDto;
import com.ecomm.back.model.Category;
import com.ecomm.back.service.ShopService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/shop")
public class ShopController {
    private final ShopService shopService;
    /* 카테고리 불러오기 */
    @GetMapping("/category-list")
    public List<Category> getCateList() {
        return shopService.getCateList();
    }

    /* 카테고리별 상품 불러오기 */
    @GetMapping("/{categoryId}")
    public List<ProductListDto> getProducts(@PathVariable String categoryId) {
        return shopService.getProducts(Integer.parseInt(categoryId));
    }

    @GetMapping("/detail/{id}")
    public ProductDto getProductById(@PathVariable String id) {
        return shopService.getProductById(Integer.parseInt(id));
    }

    @GetMapping("/search")
    public List<ProductListDto> search(@RequestParam String keyword){
        return shopService.searchProducts(keyword);
    }

}
