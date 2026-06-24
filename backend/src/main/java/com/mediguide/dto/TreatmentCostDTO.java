package com.mediguide.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TreatmentCostDTO {
    private Long id;
    private Long hospitalId;
    private String hospitalName;
    private String hospitalCity;
    private String procedureName;
    private Double estimatedCost;
    private String currency;
    private String category;
    private String notes;
}
