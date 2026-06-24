package com.mediguide.controller;

import com.mediguide.dto.DoctorDTO;
import com.mediguide.service.DoctorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
@RequiredArgsConstructor
@Tag(name = "Doctors", description = "Doctor search by specialty and language")
public class DoctorController {

    private final DoctorService doctorService;

    @GetMapping("/search")
    @Operation(summary = "Search doctors by specialty, language, or hospital")
    public ResponseEntity<List<DoctorDTO>> search(
            @RequestParam(required = false) String specialty,
            @RequestParam(required = false) String language,
            @RequestParam(required = false) Long hospitalId) {
        return ResponseEntity.ok(doctorService.searchDoctors(specialty, language, hospitalId));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get doctor details by ID")
    public ResponseEntity<DoctorDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(doctorService.findById(id));
    }

    @GetMapping("/hospital/{hospitalId}")
    @Operation(summary = "Get all doctors at a hospital")
    public ResponseEntity<List<DoctorDTO>> getByHospital(@PathVariable Long hospitalId) {
        return ResponseEntity.ok(doctorService.findByHospital(hospitalId));
    }
}
