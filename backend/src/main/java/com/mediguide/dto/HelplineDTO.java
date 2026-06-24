package com.mediguide.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class HelplineDTO {
    private Long id;
    private String country;
    private String city;
    private String serviceName;
    private String phoneNumber;
    private String serviceType;
    private String description;
    private String countryCode;
}
