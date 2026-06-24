package com.mediguide.controller;

import com.mediguide.dto.CostDashboardDTO;
import com.mediguide.dto.TreatmentCostDTO;
import com.mediguide.service.CostService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/costs")
@RequiredArgsConstructor
@Tag(name = "Treatment Costs", description = "Healthcare cost transparency data")
public class CostController {

    private final CostService costService;

    @GetMapping
    @Operation(summary = "Get treatment costs with optional filters")
    public ResponseEntity<List<TreatmentCostDTO>> getCosts(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String procedure,
            @RequestParam(required = false) String category) {
        return ResponseEntity.ok(costService.getCosts(city, procedure, category));
    }

    @GetMapping("/dashboard")
    @Operation(summary = "Get cost dashboard data for a city")
    public ResponseEntity<CostDashboardDTO> getDashboard(@RequestParam String city) {
        return ResponseEntity.ok(costService.getDashboard(city));
    }

    @GetMapping("/cities")
    @Operation(summary = "Get all cities with cost data")
    public ResponseEntity<List<String>> getCities() {
        return ResponseEntity.ok(costService.getAllCities());
    }

    @GetMapping("/hospital/{hospitalId}")
    @Operation(summary = "Get all costs for a specific hospital")
    public ResponseEntity<List<TreatmentCostDTO>> getByHospital(@PathVariable Long hospitalId) {
        return ResponseEntity.ok(costService.getCostsByHospital(hospitalId));
    }
}
