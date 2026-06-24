package com.mediguide.service;

import com.mediguide.dto.HelplineDTO;
import com.mediguide.entity.Helpline;
import com.mediguide.repository.HelplineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HelplineService {

    private final HelplineRepository helplineRepository;

    public List<HelplineDTO> getHelplines(String country, String city) {
        List<Helpline> helplines;
        if (country != null && city != null) {
            helplines = helplineRepository.findByCountryIgnoreCaseAndCityIgnoreCase(country, city);
        } else if (country != null) {
            helplines = helplineRepository.findByCountryIgnoreCase(country);
        } else {
            helplines = helplineRepository.findAll();
        }
        return helplines.stream().map(this::toDTO).collect(Collectors.toList());
    }

    public List<HelplineDTO> getAll() {
        return helplineRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    public Helpline save(Helpline helpline) {
        return helplineRepository.save(helpline);
    }

    public void delete(Long id) {
        helplineRepository.deleteById(id);
    }

    private HelplineDTO toDTO(Helpline h) {
        return HelplineDTO.builder()
                .id(h.getId())
                .country(h.getCountry())
                .city(h.getCity())
                .serviceName(h.getServiceName())
                .phoneNumber(h.getPhoneNumber())
                .serviceType(h.getServiceType().name())
                .description(h.getDescription())
                .countryCode(h.getCountryCode())
                .build();
    }
}
