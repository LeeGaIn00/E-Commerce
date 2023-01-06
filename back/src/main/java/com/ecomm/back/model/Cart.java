package com.ecomm.back.model;
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

    @NonNull
    @Column(name = "member_id")
    private String memberId;

    @NonNull
    @Column(name = "product_id")
    private Integer productId;

    @Column(name = "options_id")
    private Integer optionsId;
}
