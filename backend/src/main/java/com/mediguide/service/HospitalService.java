package com.mediguide.service;

import com.mediguide.dto.DoctorDTO;
import com.mediguide.dto.HospitalDTO;
import com.mediguide.dto.TreatmentCostDTO;
import com.mediguide.entity.Hospital;
import com.mediguide.exception.ResourceNotFoundException;
import com.mediguide.repository.HospitalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HospitalService {

    private final HospitalRepository hospitalRepository;

    public List<HospitalDTO> findNearby(Double lat, Double lng, Double radius) {
        return hospitalRepository.findNearbyHospitals(lat, lng, radius)
                .stream()
                .map(h -> toDTO(h, null))
                .collect(Collectors.toList());
    }

    public List<HospitalDTO> findAll() {
        return hospitalRepository.findAll().stream()
                .map(h -> toDTO(h, null))
                .collect(Collectors.toList());
    }

    public List<HospitalDTO> findByCity(String city) {
        return hospitalRepository.findByCityIgnoreCase(city).stream()
                .map(h -> toDTO(h, null))
                .collect(Collectors.toList());
    }

    public HospitalDTO findById(Long id) {
        Hospital hospital = hospitalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Hospital", id));
        return toDTO(hospital, null);
    }

    public List<HospitalDTO> findEmergency() {
        return hospitalRepository.findByEmergencyAvailableTrue().stream()
                .map(h -> toDTO(h, null))
                .collect(Collectors.toList());
    }

    public List<String> getAllCities() {
        return hospitalRepository.findAllCities();
    }

    public Hospital save(Hospital hospital) {
        return hospitalRepository.save(hospital);
    }

    public Hospital update(Long id, Hospital hospital) {
        if (!hospitalRepository.existsById(id)) {
            throw new ResourceNotFoundException("Hospital", id);
        }
        hospital.setId(id);
        return hospitalRepository.save(hospital);
    }

    public void delete(Long id) {
        if (!hospitalRepository.existsById(id)) {
            throw new ResourceNotFoundException("Hospital", id);
        }
        hospitalRepository.deleteById(id);
    }

    public HospitalDTO createHospital(HospitalDTO dto) {
        Hospital h = Hospital.builder()
                .name(dto.getName())
                .address(dto.getAddress())
                .latitude(dto.getLatitude())
                .longitude(dto.getLongitude())
                .city(dto.getCity())
                .country(dto.getCountry())
                .rating(dto.getRating() != null ? dto.getRating() : 0.0)
                .totalReviews(dto.getTotalReviews() != null ? dto.getTotalReviews() : 0)
                .specialties(dto.getSpecialties())
                .emergencyAvailable(dto.getEmergencyAvailable() != null ? dto.getEmergencyAvailable() : false)
                .openingHours(dto.getOpeningHours() != null ? dto.getOpeningHours() : "24/7")
                .phoneNumber(dto.getPhoneNumber())
                .website(dto.getWebsite())
                .imageUrl(dto.getImageUrl())
                .hospitalType(dto.getHospitalType())
                .bedCount(dto.getBedCount() != null ? dto.getBedCount() : 0)
                .build();

        Hospital saved = hospitalRepository.save(h);
        return toDTO(saved, null);
    }

    public HospitalDTO toDTO(Hospital h, Double distance) {
        List<DoctorDTO> doctorDTOs = h.getDoctors().stream()
                .map(d -> DoctorDTO.builder()
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
                        .hospitalId(h.getId())
                        .hospitalName(h.getName())
                        .languages(d.getLanguages().stream()
                                .map(l -> l.getLanguageName())
                                .collect(Collectors.toList()))
                        .build())
                .collect(Collectors.toList());

        List<TreatmentCostDTO> costDTOs = h.getTreatmentCosts().stream()
                .map(c -> TreatmentCostDTO.builder()
                        .id(c.getId())
                        .hospitalId(h.getId())
                        .hospitalName(h.getName())
                        .hospitalCity(h.getCity())
                        .procedureName(c.getProcedureName())
                        .estimatedCost(c.getEstimatedCost())
                        .currency(c.getCurrency())
                        .category(c.getCategory().name())
                        .notes(c.getNotes())
                        .build())
                .collect(Collectors.toList());

        return HospitalDTO.builder()
                .id(h.getId())
                .name(h.getName())
                .address(h.getAddress())
                .latitude(h.getLatitude())
                .longitude(h.getLongitude())
                .city(h.getCity())
                .country(h.getCountry())
                .rating(h.getRating())
                .totalReviews(h.getTotalReviews())
                .specialties(h.getSpecialties())
                .emergencyAvailable(h.getEmergencyAvailable())
                .openingHours(h.getOpeningHours())
                .phoneNumber(h.getPhoneNumber())
                .website(h.getWebsite())
                .imageUrl(h.getImageUrl())
                .hospitalType(h.getHospitalType())
                .bedCount(h.getBedCount())
                .distance(distance)
                .doctors(doctorDTOs)
                .costs(costDTOs)
                .build();
    }
}
