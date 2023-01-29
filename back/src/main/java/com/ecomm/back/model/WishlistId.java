package com.ecomm.back.model;

import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import java.io.Serializable;

@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
public class WishlistId implements Serializable {
    //private static final long serialVersionUID = 5735022999922182249L;

    @EqualsAndHashCode.Include
    @Column(name = "product_id")
    private Integer productId;

    @EqualsAndHashCode.Include
    @Column(name = "member_id")
    private String memberId;

    public WishlistId(String memberId, Integer productId) {
        this.memberId = memberId;
        this.productId = productId;
    }
}
