package com.Cosmin._Fit.repositories;

import com.Cosmin._Fit.model.Antrenor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AntrenorRepository extends JpaRepository<Antrenor, Long> {
    List<Antrenor> findByActivTrueOrderByNumeAscPrenumeAsc();
}
