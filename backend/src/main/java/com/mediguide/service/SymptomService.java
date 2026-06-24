package com.mediguide.service;

import com.mediguide.dto.SymptomDTO;
import com.mediguide.entity.Symptom;
import com.mediguide.repository.SymptomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SymptomService {

    private final SymptomRepository symptomRepository;

    public List<SymptomDTO> analyze(String query) {
        return symptomRepository.searchByNameOrKeywords(query).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<SymptomDTO> getAll() {
        return symptomRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    private SymptomDTO toDTO(Symptom s) {
        return SymptomDTO.builder()
                .id(s.getId())
                .name(s.getName())
                .urgencyLevel(s.getUrgencyLevel().name())
                .recommendedSpecialty(s.getRecommendedSpecialty())
                .description(s.getDescription())
                .firstAidTip(s.getFirstAidTip())
                .build();
    }
}
