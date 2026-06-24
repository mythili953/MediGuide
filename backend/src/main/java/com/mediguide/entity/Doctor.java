package com.mediguide.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "doctors")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String specialty;

    @Column(name = "experience_years")
    private Integer experienceYears;

    @Column(name = "qualification")
    private String qualification;

    @Column(name = "bio", columnDefinition = "TEXT")
    private String bio;

    @Column(name = "photo_url")
    private String photoUrl;

    @Column(name = "consultation_fee")
    private Double consultationFee;

    @Column(name = "available_days")
    private String availableDays;

    @Column(name = "available_hours")
    private String availableHours;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", nullable = false)
    private Hospital hospital;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "doctor_languages",
        joinColumns = @JoinColumn(name = "doctor_id"),
        inverseJoinColumns = @JoinColumn(name = "language_id")
    )
    @Builder.Default
    private List<Language> languages = new ArrayList<>();
}
