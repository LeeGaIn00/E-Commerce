package com.ecomm.back.service;

import com.ecomm.back.dto.*;
import com.ecomm.back.model.Cart;
import com.ecomm.back.model.Category;
import com.ecomm.back.model.Product;
import com.ecomm.back.repository.CartRepository;
import com.ecomm.back.repository.CategoryRepository;
import com.ecomm.back.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ShopService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final CartRepository cartRepository;

    public List<Category> getCateList() {
        return categoryRepository.findAll();
    }

    public List<ProductListDto> getProducts(Integer categoryId) {
        List<Product> productList;
        if (categoryId == 0) {
            productList = productRepository.findAll();
        } else {
            productList = productRepository.getProductsByCate(categoryId);
        }
        List<ProductListDto> productDtoList = productList.stream()
                .map(product -> ProductListDto.of(product))
                .collect(Collectors.toList());
        return productDtoList;
    }

    public ProductDto getProductById(Integer id) {
        return productRepository.findById(id)
                .map(ProductDto::of)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 상품입니다."));
    }

    public List<ProductListDto> searchProducts(String keyword) {
        List<Product> productList = productRepository.findByNameContaining(keyword);
        List<ProductListDto> productDtoList = productList.stream()
                .map(product -> ProductListDto.of(product))
                .collect(Collectors.toList());

        return productDtoList;
    }

////    장바구니
//    public Cart addCart(CartRequestDto cartRequestDto) {
//        String memberId = cartRequestDto.getMemberId();
//        Integer productId = cartRequestDto.getProductId();
//        String op1 = cartRequestDto.getOp1();
//        String op2 = cartRequestDto.getOp2();
//        Integer quantity = cartRequestDto.getQuantity();
//        Integer optionId;
//
//        if(op2 == null)
//            optionId = productRepository.findOptionId(productId, op1);
//        else
//            optionId = productRepository.findOptionSId(productId, op1, op2);
//
//        Cart cart = new Cart(memberId, optionId, productId, quantity);
//        return cartRepository.save(cart);
//    }

    public List<CartListDto> getCartItem(String memberId) {
        List<CartListDto> cartListDto = cartRepository.findCartList(memberId)
                .stream()
                .map(cart-> CartListDto.of(cart))
                .collect(Collectors.toList());

        return cartListDto;
    }
}

