package com.mediguide.controller;

import com.mediguide.dto.SymptomDTO;
import com.mediguide.service.SymptomService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/symptoms")
@RequiredArgsConstructor
@Tag(name = "Symptoms", description = "Symptom analysis and urgency triage")
public class SymptomController {

    private final SymptomService symptomService;

    @GetMapping
    @Operation(summary = "Get all known symptoms")
    public ResponseEntity<List<SymptomDTO>> getAll() {
        return ResponseEntity.ok(symptomService.getAll());
    }

    @PostMapping("/analyze")
    @Operation(summary = "Analyze symptoms and get urgency + specialty recommendation")
    public ResponseEntity<Map<String, Object>> analyze(@RequestBody Map<String, String> body) {
        String query = body.get("query");
        List<SymptomDTO> results = symptomService.analyze(query);

        String urgency = results.isEmpty() ? "NON_URGENT" : results.get(0).getUrgencyLevel();
        String specialty = results.isEmpty() ? "General Practice" : results.get(0).getRecommendedSpecialty();

        return ResponseEntity.ok(Map.of(
            "query", query,
            "results", results,
            "topUrgency", urgency,
            "recommendedSpecialty", specialty,
            "disclaimer", "This tool does not provide medical diagnosis. " +
                "For emergencies, contact local emergency services immediately."
        ));
    }
}
