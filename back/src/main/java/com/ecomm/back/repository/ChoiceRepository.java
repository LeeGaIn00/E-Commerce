package com.ecomm.back.repository;

import com.ecomm.back.model.Cart;
import com.ecomm.back.model.Choice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChoiceRepository extends JpaRepository<Choice, Integer> {

}
