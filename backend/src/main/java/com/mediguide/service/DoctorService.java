package com.mediguide.service;

import com.mediguide.dto.DoctorDTO;
import com.mediguide.entity.Doctor;
import com.mediguide.exception.ResourceNotFoundException;
import com.mediguide.repository.DoctorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DoctorService {

    private final DoctorRepository doctorRepository;

    public List<DoctorDTO> searchDoctors(String specialty, String langCode, Long hospitalId) {
        return doctorRepository.searchDoctors(specialty, langCode, hospitalId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public DoctorDTO findById(Long id) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Doctor", id));
        return toDTO(doctor);
    }

    public List<DoctorDTO> findByHospital(Long hospitalId) {
        return doctorRepository.findByHospitalId(hospitalId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    private DoctorDTO toDTO(Doctor d) {
        return DoctorDTO.builder()
                .id(d.getId())
                .name(d.getName())
                .specialty(d.getSpecialty())
                .experienceYears(d.getExperienceYears())
                .qualification(d.getQualification())
                .bio(d.getBio())
                .photoUrl(d.getPhotoUrl())
                .consultationFee(d.getConsultationFee())
                .availableDays(d.getAvailableDays())
                .availableHours(d.getAvailableHours())
                .hospitalId(d.getHospital().getId())
                .hospitalName(d.getHospital().getName())
                .languages(d.getLanguages().stream()
                        .map(l -> l.getLanguageName())
                        .collect(Collectors.toList()))
                .build();
    }
}
