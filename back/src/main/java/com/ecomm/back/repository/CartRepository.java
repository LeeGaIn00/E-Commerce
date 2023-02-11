package com.ecomm.back.repository;

import com.ecomm.back.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart, Integer> {
    @Query("SELECT c FROM Cart c WHERE c.member.id=:memberId")
    public List<Cart> findCartList(@Param("memberId") String memberId);

    @Query("SELECT c FROM Cart c WHERE c.member.id=:memberId AND c.choice.id=:choiceId")
    public Cart findCart(@Param("memberId") String memberId, @Param("choiceId")Integer choiceId);
}
