package com.ecomm.back.repository;

import com.ecomm.back.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
    @Query("SELECT r from Review r where r.product.id=:productId")
    public List<Review> findByProductId(@Param("productId") Integer productId);

    @Query("SELECT r from Review r where r.member.id=:memberId")
    public List<Review> findByMemberId(@Param("memberId") String memberId);
}
