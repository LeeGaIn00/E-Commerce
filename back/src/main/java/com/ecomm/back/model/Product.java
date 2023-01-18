package com.ecomm.back.model;

import lombok.Getter;
import lombok.NonNull;

import javax.persistence.*;
import java.util.Date;

@Getter
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @NonNull
    @Column(name = "name")
    private String name;

    @NonNull
    @Column(name = "price")
    private Integer price;

    @Column(name = "discount")
    private Integer discount;

    @Column(name = "image")
    private String image;

    @Column(name = "detail")
    private String detail;

    @Column(name = "option1")
    private String option1;

    @Column(name = "option2")
    private String option2;

    @Column(name = "created_time")
    private Date createdTime;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
}
