package com.mediguide.repository;

import com.mediguide.entity.Hospital;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HospitalRepository extends JpaRepository<Hospital, Long> {

    List<Hospital> findByCityIgnoreCase(String city);

    List<Hospital> findByCountryIgnoreCase(String country);

    @Query(value = """
        SELECT *, (
            6371 * acos(
                cos(radians(:lat)) * cos(radians(latitude)) *
                cos(radians(longitude) - radians(:lng)) +
                sin(radians(:lat)) * sin(radians(latitude))
            )
        ) AS distance
        FROM hospitals
        WHERE (
            6371 * acos(
                cos(radians(:lat)) * cos(radians(latitude)) *
                cos(radians(longitude) - radians(:lng)) +
                sin(radians(:lat)) * sin(radians(latitude))
            )
        ) < :radius
        ORDER BY distance
        """, nativeQuery = true)
    List<Hospital> findNearbyHospitals(@Param("lat") Double lat,
                                        @Param("lng") Double lng,
                                        @Param("radius") Double radiusKm);

    @Query("""
        SELECT DISTINCT h FROM Hospital h
        JOIN h.doctors d
        JOIN d.languages l
        WHERE l.languageCode = :langCode
        """)
    List<Hospital> findByDoctorLanguage(@Param("langCode") String languageCode);

    @Query("""
        SELECT DISTINCT h FROM Hospital h
        JOIN h.doctors d
        WHERE d.specialty = :specialty
        """)
    List<Hospital> findByDoctorSpecialty(@Param("specialty") String specialty);

    List<Hospital> findByEmergencyAvailableTrue();

    @Query("SELECT DISTINCT h.city FROM Hospital h ORDER BY h.city")
    List<String> findAllCities();
}
