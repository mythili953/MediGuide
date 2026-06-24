package com.mediguide.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "medical_phrases")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicalPhrase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "english_text", nullable = false, columnDefinition = "TEXT")
    private String englishText;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "language_id", nullable = false)
    private Language language;

    @Column(name = "translated_text", nullable = false, columnDefinition = "TEXT")
    private String translatedText;

    @Column(name = "category")
    private String category;

    @Column(name = "phonetic")
    private String phonetic;
}
