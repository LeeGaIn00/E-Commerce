package com.ecomm.back.model;

import lombok.Getter;
import lombok.NonNull;

import javax.persistence.*;

@Getter
@Entity
public class Options {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @NonNull
    @Column(name = "option1")
    private String option1;

    @Column(name = "option2")
    private String option2;

    @Column(name = "stock")
    private Integer stock;

    @NonNull
    @Column(name = "product_id")
    private Integer productId;
}
