package com.ecomm.back.model;

import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;

@Getter
@Entity
@IdClass(WishlistId.class)
public class Wishlist {
    @Id
    @Column(name = "product_id")
    private Integer productId;

    @Id
    @Column(name = "member_id")
    private String memberId;
}
