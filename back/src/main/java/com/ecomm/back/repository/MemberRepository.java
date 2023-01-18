package com.ecomm.back.repository;

import com.ecomm.back.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, String> {
//    @Query("SELECT m.profile FROM Member m WHERE m.id=:id")
//    String findProfile(@Param("id") String id);

    @Query("SELECT m FROM Member m WHERE m.id LIKE %:search%")
    List<Member> findMemberByKeyword(@Param("search") String search);

    Optional<Member> findById(String id);

    boolean existsById(String id);
    boolean existsByEmail(String email);
}
