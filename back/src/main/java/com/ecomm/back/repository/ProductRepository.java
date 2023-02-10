package com.ecomm.back.repository;

import com.ecomm.back.dto.ProductListDto;
import com.ecomm.back.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    public final static String SELECT_OPTION1_ID = ""
            + "SELECT c.id "
            + "FROM choice c "
            + "WHERE c.product_id=?1 "
            + "AND c.option1=?2";

    public final static String SELECT_OPTIONS_ID = ""
            + "SELECT c.id "
            + "FROM choice c "
            + "WHERE c.product_id=?1 "
            + "AND c.option1=?2 "
            + "AND c.option2=?3";
    /* 상품 리스트 */
    @Query("SELECT p from Product p where p.category.id=:categoryId")
    List<Product> getProductsByCate(Integer categoryId);

    /* 상품 정보 */
    Optional<Product> findById(Integer id);

    /* 상품 전체 검색 */
    List<Product> findByNameContaining(String keyword);

    /* 옵션 아이디 가져오기 */
    @Query(value = SELECT_OPTION1_ID, nativeQuery = true)
    Integer findOptionId(Integer productId, String op1);

    @Query(value = SELECT_OPTIONS_ID, nativeQuery = true)
    Integer findOptionSId(Integer productId, String op1, String op2);
}
