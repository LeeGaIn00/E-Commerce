package com.ecomm.back.repository;

import com.ecomm.back.model.Inquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface InquiryRepository extends JpaRepository<Inquiry, Integer> {
    @Query("SELECT i from Inquiry i where i.product.id=:productId")
    public List<Inquiry> findByProductId(@Param("productId") Integer productId);
}
