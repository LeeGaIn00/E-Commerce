package com.ecomm.back.model;

import lombok.Getter;
import lombok.NonNull;

import javax.persistence.*;
import java.util.Date;

@Getter
@Entity
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @NonNull
    @Column(name = "content")
    private String content;

    @Column(name = "image")
    private String image;

    @NonNull
    @Column(name = "star")
    private Integer star;

    @Column(name = "created_time")
    private Date createdTime;

    @Column(name = "updated_time")
    private Date updatedTime;

    @Column(name = "del_yn")
    private Boolean delYn;

    @NonNull
    @Column(name = "product_id")
    private Integer productId;

    @NonNull
    @Column(name = "member_id")
    private String memberId;

    @NonNull
    @Column(name = "orders_id")
    private Integer ordersId;
}
