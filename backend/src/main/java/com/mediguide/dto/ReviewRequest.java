package com.mediguide.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ReviewRequest {
    @NotNull(message = "Hospital ID is required")
    private Long hospitalId;

    @NotNull(message = "Rating is required")
    @Min(1) @Max(5)
    private Integer rating;

    @Min(1) @Max(5)
    private Integer languageRating;

    @Min(1) @Max(5)
    private Integer affordabilityRating;

    private Integer waitTimeMinutes;

    private String reviewText;
}
