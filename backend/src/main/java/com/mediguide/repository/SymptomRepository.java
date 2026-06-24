package com.mediguide.repository;

import com.mediguide.entity.Symptom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SymptomRepository extends JpaRepository<Symptom, Long> {

    @Query("""
        SELECT s FROM Symptom s
        WHERE LOWER(s.name) LIKE LOWER(CONCAT('%', :query, '%'))
        OR LOWER(s.keywords) LIKE LOWER(CONCAT('%', :query, '%'))
        """)
    List<Symptom> searchByNameOrKeywords(@Param("query") String query);

    List<Symptom> findByUrgencyLevel(Symptom.UrgencyLevel urgencyLevel);
}
