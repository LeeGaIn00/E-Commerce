package com.ecomm.back.repository;

import com.ecomm.back.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
    public final static String SELECT_REVIEW = ""

            + "SELECT "
            + "r.content as content,"
            + "r.image as r_image,"
            + "r.star as star,"
            + "p.id as id,"
            + "p.name as name,"
            + "p.image as p_image "
            + "FROM review r join product p on r.product_id=p.id";

    @Query("SELECT r from Review r where r.product.id=:productId")
    public List<Review> findByProductId(@Param("productId") Integer productId);

    @Query("SELECT r from Review r where r.member.id=:memberId")
    public List<Review> findByMemberId(@Param("memberId") String memberId);

//    @Query(value = SELECT_REVIEW, nativeQuery = true)
//    List<MyReview> findByMemberId(final String memberId);
}
