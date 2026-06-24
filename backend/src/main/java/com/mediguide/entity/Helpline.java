package com.mediguide.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "helplines")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Helpline {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String country;

    @Column
    private String city;

    @Column(name = "service_name", nullable = false)
    private String serviceName;

    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "service_type", nullable = false)
    private ServiceType serviceType;

    @Column
    private String description;

    @Column(name = "country_code")
    private String countryCode;

    public enum ServiceType {
        AMBULANCE, POLICE, FIRE, MEDICAL_HELPLINE, TOURIST_HELPLINE, EMBASSY
    }
}
