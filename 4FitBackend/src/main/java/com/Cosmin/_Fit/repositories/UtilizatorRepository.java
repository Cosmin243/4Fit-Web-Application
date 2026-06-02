package com.Cosmin._Fit.repositories;

import com.Cosmin._Fit.model.Utilizator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UtilizatorRepository extends JpaRepository<Utilizator, Long> {
    Optional<Utilizator> findByKeycloakId(String keycloakId);
    List<Utilizator> findAllByOrderByNumeAscPrenumeAsc();
}
