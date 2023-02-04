package com.ecomm.back.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import lombok.NonNull;

import javax.persistence.*;

@Getter
@Entity
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @NonNull
    @Column(name = "quantity")
    private Integer quantity;

//    @NonNull
//    @Column(name = "member_id")
//    private String memberId;
//
//    @NonNull
//    @Column(name = "product_id")
//    private Integer productId;

    @NonNull
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @NonNull
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "options_id")
    private Integer optionsId;

    @Builder
    public Cart(Integer id, Integer quantity, Integer optionsId) {
        this.id = id;
        this.quantity = quantity;
        this.optionsId = optionsId;
    }

    public void changeProduct(Product product) {
        this.product = product;
    }

    public void changeMember(Member member) {
        this.member = member;
    }


    public Cart() {

    }

//    public Cart(String memberId, Integer optionsId, Integer productId, Integer quantity) {
//        this.memberId = memberId;
//        this.optionsId = optionsId;
//        this.productId = productId;
//        this.quantity = quantity;
//    }
}
