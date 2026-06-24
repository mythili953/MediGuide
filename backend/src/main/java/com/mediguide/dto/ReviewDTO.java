package com.mediguide.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ReviewDTO {
    private Long id;
    private Long userId;
    private String userName;
    private Long hospitalId;
    private String hospitalName;
    private Integer rating;
    private Integer languageRating;
    private Integer affordabilityRating;
    private Integer waitTimeMinutes;
    private String reviewText;
    private LocalDateTime createdAt;
}
