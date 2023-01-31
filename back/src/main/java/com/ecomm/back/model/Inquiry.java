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
@SQLDelete(sql = "UPDATE inquiry SET del_yn = true, updated_time = now() WHERE id = ?")
@Where(clause = "del_yn = false")
public class Inquiry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @NonNull
    @Column(name = "type")
    private String type;

    @NonNull
    @Column(name = "title")
    private String title;

    @NonNull
    @Column(name = "content")
    private String content;

    @Column(name = "image")
    private String image;

    @Column(name = "answer")
    private String answer;

    @Column(name = "created_time")
    private Date createdTime;

    @Column(name = "updated_time")
    private Date updatedTime;

    @Column(name = "del_yn")
    private Boolean delYn;

    @Column(name = "secret")
    private Boolean secret;

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

    @PrePersist
    public void prePersist(){
        this.createdTime = this.createdTime == null ? new Timestamp(System.currentTimeMillis()) : this.createdTime;
        this.delYn = this.delYn == null ? false : this.delYn;
    }

    @Builder
    public Inquiry(String type, String title, String content, String image, Boolean secret) {
        this.type = type;
        this.title = title;
        this.content = content;
        this.image = image;
        this.secret = secret;
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

    public void update(String type, String title, String content, String image, Boolean secret) {
        this.type = type;
        this.title = title;
        this.content = content;
        this.image = image;
        this.secret = secret;
        this.updatedTime = new Timestamp(System.currentTimeMillis());
    }
}
