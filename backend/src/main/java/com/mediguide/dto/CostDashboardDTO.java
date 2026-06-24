package com.mediguide.dto;

import lombok.Builder;
import lombok.Data;

import java.util.Map;

@Data
@Builder
public class CostDashboardDTO {
    private String city;
    private Map<String, Double> averageCosts;  // procedure -> avgCost
    private Double averageConsultationCost;
    private Double averageEmergencyCost;
    private Double averageMriCost;
    private Double averageBloodTestCost;
    private String currency;
}
