package com.mediguide.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MedicalPhraseDTO {
    private Long id;
    private String englishText;
    private String languageCode;
    private String languageName;
    private String translatedText;
    private String category;
    private String phonetic;
}
