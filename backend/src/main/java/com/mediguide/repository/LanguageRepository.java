package com.mediguide.repository;

import com.mediguide.entity.Language;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LanguageRepository extends JpaRepository<Language, Long> {
    Optional<Language> findByLanguageCode(String languageCode);
    Optional<Language> findByLanguageNameIgnoreCase(String languageName);
}
