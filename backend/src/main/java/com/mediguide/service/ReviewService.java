package com.mediguide.service;

import com.mediguide.dto.ReviewDTO;
import com.mediguide.dto.ReviewRequest;
import com.mediguide.entity.Hospital;
import com.mediguide.entity.Review;
import com.mediguide.entity.User;
import com.mediguide.exception.ResourceNotFoundException;
import com.mediguide.repository.HospitalRepository;
import com.mediguide.repository.ReviewRepository;
import com.mediguide.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final HospitalRepository hospitalRepository;

    public List<ReviewDTO> getByHospital(Long hospitalId) {
        return reviewRepository.findByHospitalIdOrderByCreatedAtDesc(hospitalId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public ReviewDTO create(ReviewRequest request, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Hospital hospital = hospitalRepository.findById(request.getHospitalId())
                .orElseThrow(() -> new ResourceNotFoundException("Hospital", request.getHospitalId()));

        Review review = Review.builder()
                .user(user)
                .hospital(hospital)
                .rating(request.getRating())
                .languageRating(request.getLanguageRating())
                .affordabilityRating(request.getAffordabilityRating())
                .waitTimeMinutes(request.getWaitTimeMinutes())
                .reviewText(request.getReviewText())
                .build();

        Review saved = reviewRepository.save(review);

        // Update hospital rating
        Double avgRating = reviewRepository.getAverageRatingByHospital(hospital.getId());
        Long count = reviewRepository.countByHospitalId(hospital.getId());
        hospital.setRating(avgRating != null ? Math.round(avgRating * 10.0) / 10.0 : 0.0);
        hospital.setTotalReviews(count.intValue());
        hospitalRepository.save(hospital);

        return toDTO(saved);
    }

    public void delete(Long reviewId, String userEmail) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ResourceNotFoundException("Review", reviewId));
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!review.getUser().getId().equals(user.getId()) &&
                !user.getRole().equals(com.mediguide.entity.User.Role.ADMIN)) {
            throw new org.springframework.security.access.AccessDeniedException("Not authorized");
        }
        reviewRepository.deleteById(reviewId);
    }

    private ReviewDTO toDTO(Review r) {
        return ReviewDTO.builder()
                .id(r.getId())
                .userId(r.getUser().getId())
                .userName(r.getUser().getName())
                .hospitalId(r.getHospital().getId())
                .hospitalName(r.getHospital().getName())
                .rating(r.getRating())
                .languageRating(r.getLanguageRating())
                .affordabilityRating(r.getAffordabilityRating())
                .waitTimeMinutes(r.getWaitTimeMinutes())
                .reviewText(r.getReviewText())
                .createdAt(r.getCreatedAt())
                .build();
    }
}
