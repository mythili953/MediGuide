package com.mediguide.controller;

import com.mediguide.dto.HospitalDTO;
import com.mediguide.service.HospitalService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hospitals")
@RequiredArgsConstructor
@Tag(name = "Hospitals", description = "Hospital search and management")
public class HospitalController {

    private final HospitalService hospitalService;

    @GetMapping
    @Operation(summary = "Get all hospitals or filter by city")
    public ResponseEntity<List<HospitalDTO>> getAll(@RequestParam(required = false) String city) {
        if (city != null) {
            return ResponseEntity.ok(hospitalService.findByCity(city));
        }
        return ResponseEntity.ok(hospitalService.findAll());
    }

    @GetMapping("/nearby")
    @Operation(summary = "Find hospitals near a location")
    public ResponseEntity<List<HospitalDTO>> getNearby(
            @RequestParam Double lat,
            @RequestParam Double lng,
            @RequestParam(defaultValue = "10.0") Double radius) {
        return ResponseEntity.ok(hospitalService.findNearby(lat, lng, radius));
    }

    @GetMapping("/emergency")
    @Operation(summary = "Get hospitals with 24/7 emergency services")
    public ResponseEntity<List<HospitalDTO>> getEmergency() {
        return ResponseEntity.ok(hospitalService.findEmergency());
    }

    @GetMapping("/cities")
    @Operation(summary = "Get all available cities")
    public ResponseEntity<List<String>> getCities() {
        return ResponseEntity.ok(hospitalService.getAllCities());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get hospital details by ID")
    public ResponseEntity<HospitalDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(hospitalService.findById(id));
    }
}
