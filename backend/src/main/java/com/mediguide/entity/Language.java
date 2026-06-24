package com.mediguide.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "languages")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Language {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "language_name", nullable = false, unique = true)
    private String languageName;

    @Column(name = "language_code", nullable = false, unique = true)
    private String languageCode;

    @Column(name = "native_name")
    private String nativeName;
}
