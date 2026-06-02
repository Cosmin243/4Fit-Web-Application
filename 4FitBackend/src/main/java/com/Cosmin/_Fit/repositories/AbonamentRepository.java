package com.Cosmin._Fit.repositories;

import com.Cosmin._Fit.model.Abonament;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AbonamentRepository extends JpaRepository<Abonament, Long> {
    List<Abonament> findByKeycloakIdOrderByDataStartDesc(String keycloakId);

    List<Abonament> findByKeycloakIdAndActivTrueOrderByDataEndDesc(String keycloakId);

    Optional<Abonament> findFirstByKeycloakIdAndActivTrueAndSedinteClaseRamaseGreaterThanOrderByDataEndAsc(
            String keycloakId,
            Integer sedinteClaseRamase
    );
}
