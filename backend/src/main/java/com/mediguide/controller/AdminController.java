package com.mediguide.controller;

import com.mediguide.dto.HospitalDTO;
import com.mediguide.repository.HospitalRepository;
import com.mediguide.repository.ReviewRepository;
import com.mediguide.repository.UserRepository;
import com.mediguide.service.HospitalService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
@Tag(name = "Admin", description = "Admin-only management endpoints")
public class AdminController {

    private final UserRepository userRepository;
    private final HospitalRepository hospitalRepository;
    private final ReviewRepository reviewRepository;
    private final HospitalService hospitalService;

    @GetMapping("/analytics")
    @Operation(summary = "Get platform analytics metrics")
    public ResponseEntity<Map<String, Object>> getAnalytics() {
        Map<String, Object> analytics = new HashMap<>();
        analytics.put("totalUsers", userRepository.count());
        analytics.put("totalHospitals", hospitalRepository.count());
        analytics.put("totalReviews", reviewRepository.count());
        analytics.put("cities", hospitalRepository.findAllCities());
        return ResponseEntity.ok(analytics);
    }

    @GetMapping("/users")
    @Operation(summary = "Get all users")
    public ResponseEntity<?> getUsers() {
        return ResponseEntity.ok(userRepository.findAll().stream()
                .map(u -> Map.of(
                    "id", u.getId(),
                    "name", u.getName(),
                    "email", u.getEmail(),
                    "role", u.getRole().name(),
                    "nationality", u.getNationality() != null ? u.getNationality() : ""
                ))
                .toList());
    }

    @DeleteMapping("/users/{id}")
    @Operation(summary = "Delete a user")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/reviews/{id}")
    @Operation(summary = "Delete any review (admin moderation)")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        reviewRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/hospitals")
    @Operation(summary = "Add a new hospital")
    public ResponseEntity<HospitalDTO> addHospital(@RequestBody HospitalDTO hospitalDTO) {
        return ResponseEntity.ok(hospitalService.createHospital(hospitalDTO));
    }

    @DeleteMapping("/hospitals/{id}")
    @Operation(summary = "Delete a hospital")
    public ResponseEntity<Void> deleteHospital(@PathVariable Long id) {
        hospitalService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
