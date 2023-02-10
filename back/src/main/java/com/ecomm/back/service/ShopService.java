package com.ecomm.back.service;

import com.ecomm.back.dto.*;
import com.ecomm.back.model.*;
import com.ecomm.back.model.Product;
import com.ecomm.back.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ShopService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    public final MemberRepository memberRepository;
    public final ChoiceRepository choiceRepository;
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

//    장바구니
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
//        Cart cart = new Cart(quantity, productId, memberId, optionId) ;
//        return cartRepository.save(cart);
//    }
    public CartResponseDto addCart(CartRequestDto cartRequestDto) {
        Cart cart = cartRequestDto.toCart();
        Integer productId = cartRequestDto.getProductId();
        String op1 = cartRequestDto.getOp1();
        String op2 = cartRequestDto.getOp2();
        Integer optionId;

        if(op2 == null)
            optionId = productRepository.findOptionId(productId, op1);
        else
            optionId = productRepository.findOptionSId(productId, op1, op2);

        Optional<Product> product = productRepository.findById(cartRequestDto.getProductId());
        Optional<Member> member = memberRepository.findById(cartRequestDto.getMemberId());
        Optional<Choice> choice = choiceRepository.findById(optionId);

        product.ifPresent(re->{        // null이 아닌 경우 코드 실행
            cart.changeProduct(re);
        });
        member.ifPresent(re->{
            cart.changeMember(re);
        });
        choice.ifPresent(re->{
            cart.changeChoice(re);
        });
        return CartResponseDto.of(cartRepository.save(cart));
    }

    public List<CartListDto> getCartItem(String memberId) {
        List<CartListDto> cartListDto = cartRepository.findCartList(memberId)
                .stream()
                .map(cart-> CartListDto.of(cart))
                .collect(Collectors.toList());

        return cartListDto;
    }
}

