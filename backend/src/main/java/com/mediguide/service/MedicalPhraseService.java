package com.mediguide.service;

import com.mediguide.dto.MedicalPhraseDTO;
import com.mediguide.entity.MedicalPhrase;
import com.mediguide.repository.MedicalPhraseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MedicalPhraseService {

    private final MedicalPhraseRepository phraseRepository;

    public List<MedicalPhraseDTO> getPhrases(String languageCode) {
        return phraseRepository.findByLanguageLanguageCode(languageCode).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<MedicalPhraseDTO> getByCategory(String category, String languageCode) {
        return phraseRepository.findByCategoryAndLanguageLanguageCode(category, languageCode).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<MedicalPhraseDTO> search(String query, String languageCode) {
        return phraseRepository.searchPhrases(query, languageCode).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    private MedicalPhraseDTO toDTO(MedicalPhrase mp) {
        return MedicalPhraseDTO.builder()
                .id(mp.getId())
                .englishText(mp.getEnglishText())
                .languageCode(mp.getLanguage().getLanguageCode())
                .languageName(mp.getLanguage().getLanguageName())
                .translatedText(mp.getTranslatedText())
                .category(mp.getCategory())
                .phonetic(mp.getPhonetic())
                .build();
    }
}
