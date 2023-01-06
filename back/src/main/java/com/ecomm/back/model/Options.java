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
    @Column(name = "content")
    private String content;

    @NonNull
    @Column(name = "product_id")
    private Integer productId;
}
