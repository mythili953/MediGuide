package com.mediguide.controller;

import com.mediguide.dto.ReviewDTO;
import com.mediguide.dto.ReviewRequest;
import com.mediguide.service.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
@Tag(name = "Reviews", description = "Hospital reviews and ratings from travelers")
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping("/hospital/{hospitalId}")
    @Operation(summary = "Get all reviews for a hospital")
    public ResponseEntity<List<ReviewDTO>> getByHospital(@PathVariable Long hospitalId) {
        return ResponseEntity.ok(reviewService.getByHospital(hospitalId));
    }

    @PostMapping
    @Operation(summary = "Submit a review for a hospital")
    public ResponseEntity<ReviewDTO> create(
            @Valid @RequestBody ReviewRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(reviewService.create(request, userDetails.getUsername()));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a review")
    public ResponseEntity<Void> delete(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        reviewService.delete(id, userDetails.getUsername());
        return ResponseEntity.noContent().build();
    }
}
