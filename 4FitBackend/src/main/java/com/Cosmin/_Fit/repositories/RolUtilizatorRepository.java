package com.Cosmin._Fit.repositories;

import com.Cosmin._Fit.model.RolUtilizator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RolUtilizatorRepository extends JpaRepository<RolUtilizator, Long> {
    Optional<RolUtilizator> findByNumeRolIgnoreCase(String numeRol);
}
