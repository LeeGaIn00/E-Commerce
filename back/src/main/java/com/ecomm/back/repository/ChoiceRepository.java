package com.ecomm.back.repository;

import com.ecomm.back.model.Cart;
import com.ecomm.back.model.Choice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChoiceRepository extends JpaRepository<Choice, Integer> {
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

    /* 옵션 아이디 가져오기 */
    @Query(value = SELECT_OPTION1_ID, nativeQuery = true)
    Integer findOptionId(Integer productId, String op1);

    @Query(value = SELECT_OPTIONS_ID, nativeQuery = true)
    Integer findOptionSId(Integer productId, String op1, String op2);
}
