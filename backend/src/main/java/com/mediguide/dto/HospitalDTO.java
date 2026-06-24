package com.mediguide.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class HospitalDTO {
    private Long id;
    private String name;
    private String address;
    private Double latitude;
    private Double longitude;
    private String city;
    private String country;
    private Double rating;
    private Integer totalReviews;
    private String specialties;
    private Boolean emergencyAvailable;
    private String openingHours;
    private String phoneNumber;
    private String website;
    private String imageUrl;
    private String hospitalType;
    private Integer bedCount;
    private Double distance; // km, computed for nearby search
    private List<DoctorDTO> doctors;
    private List<TreatmentCostDTO> costs;
}
