package com.mediguide.repository;

import com.mediguide.entity.Helpline;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HelplineRepository extends JpaRepository<Helpline, Long> {

    List<Helpline> findByCountryIgnoreCase(String country);

    List<Helpline> findByCountryIgnoreCaseAndCityIgnoreCase(String country, String city);

    List<Helpline> findByCountryCodeIgnoreCase(String countryCode);
}
