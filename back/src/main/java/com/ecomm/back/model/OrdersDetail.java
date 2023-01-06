package com.ecomm.back.model;

import lombok.Getter;
import lombok.NonNull;

import javax.persistence.*;

@Getter
@Entity
public class OrdersDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "quantity")
    private Integer quantity;

    @NonNull
    @Column(name = "product_id")
    private Integer productId;

    @NonNull
    @Column(name = "orders_id")
    private Integer ordersId;

    @NonNull
    @Column(name = "options_id")
    private Integer optionsId;
}
