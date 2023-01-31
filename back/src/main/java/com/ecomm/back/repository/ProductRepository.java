package com.ecomm.back.repository;

import com.ecomm.back.dto.ProductListDto;
import com.ecomm.back.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    public final static String SELECT_PRODUCT = ""
            + "SELECT "
            + "p.id as id,"
            + "p.name as name,"
            + "p.price as price,"
            + "p.discount as discount,"
            + "p.image as image "
            + "FROM product p "
            + "WHERE p.id = ?1";
    /* 상품 리스트 */
    @Query("SELECT p from Product p where p.category.id=:categoryId")
    List<Product> getProductsByCate(Integer categoryId);

    /* 상품 정보 */
    Optional<Product> findById(Integer id);

    /* 상품 전체 검색 */
    List<Product> findByNameContaining(String keyword);

//    /* 특정 옵션만 검색 */
//    @Query(value = SELECT_PRODUCT, nativeQuery = true)
//    Product findByProductId(final Integer productId);
}
