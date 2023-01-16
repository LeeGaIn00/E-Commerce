package com.ecomm.back.model;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;

@Getter
@Entity
@NoArgsConstructor(access= AccessLevel.PROTECTED)
@DynamicInsert
@DynamicUpdate
public class Member {
    @Id
    @Column(name = "id")
    private String id;

    @NonNull
    @Column(name = "password")
    private String password;

    @Column(name = "email")
    private String email;

    @Column(name = "name")
    private String name;

    @Column(name = "address")
    private String address;

    @Column(name = "phone")
    private String phone;

    @Column(name = "created_time")
    private Date createdTime;

    @Enumerated(EnumType.STRING)
    private Authority authority;

    public void setName(String name) {
        this.name = name;
    }

    public void setPassword(String password) { this.password = password; }

    @Builder
    public Member(String id, String email, String password, String name, String address, String phone, Authority authority) {
        this.id = id;
        this.password = password;
        this.email = email;
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.authority = authority;
    }
}
