package com.mediguide.service;

import com.mediguide.dto.CostDashboardDTO;
import com.mediguide.dto.TreatmentCostDTO;
import com.mediguide.entity.TreatmentCost;
import com.mediguide.repository.TreatmentCostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CostService {

    private final TreatmentCostRepository costRepository;

    public List<TreatmentCostDTO> getCosts(String city, String procedure, String category) {
        TreatmentCost.CostCategory cat = category != null ? TreatmentCost.CostCategory.valueOf(category.toUpperCase()) : null;
        return costRepository.findByCityAndFilters(city, procedure, cat).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public CostDashboardDTO getDashboard(String city) {
        List<Object[]> rows = costRepository.getAverageCostsByCity(city);
        Map<String, Double> avgCosts = new LinkedHashMap<>();
        double consultCost = 0, emergCost = 0, mriCost = 0, bloodCost = 0;

        for (Object[] row : rows) {
            String proc = (String) row[0];
            Double avg = ((Number) row[1]).doubleValue();
            avgCosts.put(proc, Math.round(avg * 100.0) / 100.0);
            String lower = proc.toLowerCase();
            if (lower.contains("consultation")) consultCost = avg;
            else if (lower.contains("emergency")) emergCost = avg;
            else if (lower.contains("mri")) mriCost = avg;
            else if (lower.contains("blood")) bloodCost = avg;
        }

        return CostDashboardDTO.builder()
                .city(city)
                .averageCosts(avgCosts)
                .averageConsultationCost(consultCost)
                .averageEmergencyCost(emergCost)
                .averageMriCost(mriCost)
                .averageBloodTestCost(bloodCost)
                .currency("USD")
                .build();
    }

    public List<TreatmentCostDTO> getCostsByHospital(Long hospitalId) {
        return costRepository.findByHospitalId(hospitalId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<String> getAllCities() {
        return costRepository.getAllCityCostAverages().stream()
                .map(row -> (String) row[0])
                .distinct()
                .sorted()
                .collect(Collectors.toList());
    }

    private TreatmentCostDTO toDTO(TreatmentCost c) {
        return TreatmentCostDTO.builder()
                .id(c.getId())
                .hospitalId(c.getHospital().getId())
                .hospitalName(c.getHospital().getName())
                .hospitalCity(c.getHospital().getCity())
                .procedureName(c.getProcedureName())
                .estimatedCost(c.getEstimatedCost())
                .currency(c.getCurrency())
                .category(c.getCategory().name())
                .notes(c.getNotes())
                .build();
    }
}
