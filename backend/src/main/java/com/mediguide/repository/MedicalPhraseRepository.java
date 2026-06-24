package com.mediguide.repository;

import com.mediguide.entity.MedicalPhrase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicalPhraseRepository extends JpaRepository<MedicalPhrase, Long> {

    List<MedicalPhrase> findByLanguageLanguageCode(String languageCode);

    List<MedicalPhrase> findByCategoryAndLanguageLanguageCode(String category, String languageCode);

    @Query("""
        SELECT mp FROM MedicalPhrase mp
        WHERE LOWER(mp.englishText) LIKE LOWER(CONCAT('%', :query, '%'))
        AND mp.language.languageCode = :langCode
        """)
    List<MedicalPhrase> searchPhrases(@Param("query") String query, @Param("langCode") String langCode);
}
