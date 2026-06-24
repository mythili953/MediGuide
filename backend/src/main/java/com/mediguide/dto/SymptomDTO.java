package com.mediguide.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SymptomDTO {
    private Long id;
    private String name;
    private String urgencyLevel;
    private String recommendedSpecialty;
    private String description;
    private String firstAidTip;
}
