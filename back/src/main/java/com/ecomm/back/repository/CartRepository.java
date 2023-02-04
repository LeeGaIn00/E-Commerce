package com.ecomm.back.repository;

import com.ecomm.back.dto.CartListDto;
import com.ecomm.back.model.Cart;
import com.ecomm.back.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart, Integer> {
    @Query("SELECT c from Cart c where c.member.id=:memberId")
    public List<Cart> findCartList(@Param("memberId") String memberId);

}
