package com.mediguide.repository;

import com.mediguide.entity.TreatmentCost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TreatmentCostRepository extends JpaRepository<TreatmentCost, Long> {

    List<TreatmentCost> findByHospitalId(Long hospitalId);

    @Query("""
        SELECT t FROM TreatmentCost t
        WHERE t.hospital.city = :city
        AND (:procedure IS NULL OR LOWER(t.procedureName) LIKE LOWER(CONCAT('%', :procedure, '%')))
        AND (:category IS NULL OR t.category = :category)
        """)
    List<TreatmentCost> findByCityAndFilters(@Param("city") String city,
                                               @Param("procedure") String procedure,
                                               @Param("category") TreatmentCost.CostCategory category);

    @Query("""
        SELECT t.procedureName, AVG(t.estimatedCost) as avgCost
        FROM TreatmentCost t
        WHERE t.hospital.city = :city
        GROUP BY t.procedureName
        ORDER BY t.procedureName
        """)
    List<Object[]> getAverageCostsByCity(@Param("city") String city);

    @Query("""
        SELECT t.hospital.city, t.procedureName, AVG(t.estimatedCost) as avgCost
        FROM TreatmentCost t
        GROUP BY t.hospital.city, t.procedureName
        ORDER BY t.hospital.city, t.procedureName
        """)
    List<Object[]> getAllCityCostAverages();
}
