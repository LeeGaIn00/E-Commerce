package com.ecomm.back.repository;

import com.ecomm.back.dto.Product;
import com.ecomm.back.model.Wishlist;
import com.ecomm.back.model.WishlistId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface WishlistRepository extends JpaRepository<Wishlist, WishlistId> {
    /* Like 누른 상품 */
    public final static String SELECT_LIKE_PRODUCT = ""
            + "SELECT "
            + "p.id as id,"
            + "p.name as name,"
            + "p.price as price,"
            + "p.discount as discount,"
            + "p.image as image "
            + "FROM product p "
            + "WHERE p.id in "
            + "(SELECT DISTINCT w.product_id FROM wishlist w "
            + "WHERE w.member_id = ?1)";

    /* Like 누른 상품 아이디 */
    public final static String SELECT_WISH_ID = ""
            + "SELECT product_id FROM wishlist "
            + "WHERE member_id=?1";

    @Query(value = SELECT_LIKE_PRODUCT, nativeQuery = true)
    List<Product> findByMemberId(final String memberId);

    @Query(value = SELECT_WISH_ID, nativeQuery = true)
    List<Integer> findWishId(final String memberId);
}