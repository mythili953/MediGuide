package com.mediguide.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class DoctorDTO {
    private Long id;
    private String name;
    private String specialty;
    private Integer experienceYears;
    private String qualification;
    private String bio;
    private String photoUrl;
    private Double consultationFee;
    private String availableDays;
    private String availableHours;
    private Long hospitalId;
    private String hospitalName;
    private List<String> languages;
}
