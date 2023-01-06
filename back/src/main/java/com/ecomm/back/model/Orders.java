package com.ecomm.back.model;

import lombok.Getter;
import lombok.NonNull;

import javax.persistence.*;
import java.util.Date;

@Getter
@Entity
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @NonNull
    @Column(name = "total_price")
    private Integer totalPrice;

    @NonNull
    @Column(name = "address")
    private String address;

    @Column(name = "created_time")
    private Date createdTime;

    @NonNull
    @Column(name = "member_id")
    private String memberId;
}
