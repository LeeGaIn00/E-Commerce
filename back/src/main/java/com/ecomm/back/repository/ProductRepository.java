package com.ecomm.back.repository;

import com.ecomm.back.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    /* 상품 리스트 */
    @Query("SELECT p from Product p where p.category.id=:categoryId")
    List<Product> getProductsByCate(Integer categoryId);

    /* 상품 정보 */
    Optional<Product> findById(Integer id);

    /* 상품 전체 검색 */
    List<Product> findByNameContaining(String keyword);
}
