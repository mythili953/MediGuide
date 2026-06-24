package com.mediguide.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "treatment_costs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TreatmentCost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", nullable = false)
    private Hospital hospital;

    @Column(name = "procedure_name", nullable = false)
    private String procedureName;

    @Column(name = "estimated_cost", nullable = false)
    private Double estimatedCost;

    @Column(name = "currency")
    @Builder.Default
    private String currency = "USD";

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CostCategory category;

    @Column(name = "notes")
    private String notes;

    public enum CostCategory {
        BUDGET, MODERATE, PREMIUM
    }
}
