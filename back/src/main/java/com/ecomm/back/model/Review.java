package com.ecomm.back.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.StringTokenizer;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE review SET del_yn = true, updated_time = now() WHERE id = ?")
@Where(clause = "del_yn = false")
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
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    @NonNull
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @NonNull
    @Column(name = "orders_id")
    private Integer ordersId;

    @PrePersist
    public void prePersist(){
        this.createdTime = this.createdTime == null ? new Timestamp(System.currentTimeMillis()) : this.createdTime;
        this.delYn = this.delYn == null ? false : this.delYn;
    }

    @Builder
    public Review(Integer id, String content, String image, Integer star) {
        this.content = content;
        this.image = image;
        this.star = star;
    }

    public void changeProduct(Product product) {
        this.product = product;
    }
    public void changeMember(Member member) {
        this.member = member;
    }

    public List<String> getImageList() {
        List<String> list = new ArrayList<String>();
        if(image != null) {
            StringTokenizer tokens = new StringTokenizer(this.image, "\t");
            while (tokens.hasMoreTokens())
                list.add(tokens.nextToken());
        }
        return list;
    }

    public void update(String content, String image, Integer star) {
        this.content = content;
        this.image = image;
        this.star = star;
        this.updatedTime = new Timestamp(System.currentTimeMillis());
    }

}
