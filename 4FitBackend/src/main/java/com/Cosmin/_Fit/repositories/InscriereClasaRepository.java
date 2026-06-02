package com.Cosmin._Fit.repositories;

import com.Cosmin._Fit.model.InscriereClasa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InscriereClasaRepository extends JpaRepository<InscriereClasa, Long> {
    List<InscriereClasa> findByKeycloakIdAndStatusOrderByClasaDataOraAsc(String keycloakId, String status);

    boolean existsByKeycloakIdAndClasaIdAndStatus(String keycloakId, Long clasaId, String status);

    Optional<InscriereClasa> findByKeycloakIdAndClasaIdAndStatus(String keycloakId, Long clasaId, String status);
}
