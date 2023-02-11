package com.ecomm.back.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
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
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "choice_id")
    private Choice choice;

    @Builder
    public Cart(Integer id, Integer quantity) {
        this.id = id;
        this.quantity = quantity;
    }

    public void changeProduct(Product product) {
        this.product = product;
    }

    public void changeMember(Member member) {
        this.member = member;
    }

    public void changeChoice(Choice choice) { this.choice = choice; }

    public Cart() {

    }

    public void update(Integer id, Integer quantity) {
        this.id = id;
        this.quantity = quantity;
    }
}
