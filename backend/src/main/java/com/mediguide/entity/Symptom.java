package com.mediguide.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "symptoms")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Symptom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "keywords", columnDefinition = "TEXT")
    private String keywords;

    @Enumerated(EnumType.STRING)
    @Column(name = "urgency_level", nullable = false)
    private UrgencyLevel urgencyLevel;

    @Column(name = "recommended_specialty", nullable = false)
    private String recommendedSpecialty;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "first_aid_tip", columnDefinition = "TEXT")
    private String firstAidTip;

    public enum UrgencyLevel {
        EMERGENCY, URGENT, NON_URGENT
    }
}
