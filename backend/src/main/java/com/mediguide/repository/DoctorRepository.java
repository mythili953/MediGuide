package com.mediguide.repository;

import com.mediguide.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    List<Doctor> findByHospitalId(Long hospitalId);

    List<Doctor> findBySpecialtyIgnoreCase(String specialty);

    @Query("""
        SELECT d FROM Doctor d
        JOIN d.languages l
        WHERE l.languageCode = :langCode
        """)
    List<Doctor> findByLanguageCode(@Param("langCode") String languageCode);

    @Query("""
        SELECT d FROM Doctor d
        JOIN d.languages l
        WHERE (:specialty IS NULL OR d.specialty = :specialty)
        AND (:langCode IS NULL OR l.languageCode = :langCode)
        AND (:hospitalId IS NULL OR d.hospital.id = :hospitalId)
        """)
    List<Doctor> searchDoctors(@Param("specialty") String specialty,
                                @Param("langCode") String langCode,
                                @Param("hospitalId") Long hospitalId);
}
