package com.ecomm.back.service;

import com.ecomm.back.dto.ProductDto;
import com.ecomm.back.dto.ProductListDto;
import com.ecomm.back.model.Category;
import com.ecomm.back.model.Product;
import com.ecomm.back.repository.CategoryRepository;
import com.ecomm.back.repository.ShopRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ShopService {
    private final ShopRepository shopRepository;
    private final CategoryRepository categoryRepository;

    public List<Category> getCateList() {
        return categoryRepository.findAll();
    }

    public List<ProductListDto> getProducts(Integer categoryId) {
        List<Product> productList;
        if(categoryId == 0) {
            productList = shopRepository.findAll();
        } else {
            productList = shopRepository.getProductsByCate(categoryId);
        }
        List<ProductListDto> productDtoList = productList.stream()
                .map(product-> ProductListDto.of(product))
                .collect(Collectors.toList());
        return productDtoList;
    }

    public ProductDto getProductById(Integer id) {
        return shopRepository.findById(id)
                .map(ProductDto::of)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 상품입니다."));
    }

    public List<ProductListDto> searchProducts(String keyword) {
        List<Product> productList = shopRepository.findByNameContaining(keyword);
        List<ProductListDto> productDtoList = productList.stream()
                .map(product-> ProductListDto.of(product))
                .collect(Collectors.toList());

        return productDtoList;
    }
}
