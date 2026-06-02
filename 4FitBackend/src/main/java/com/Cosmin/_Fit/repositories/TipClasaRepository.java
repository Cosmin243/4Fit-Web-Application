package com.Cosmin._Fit.repositories;

import com.Cosmin._Fit.model.TipClasa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TipClasaRepository extends JpaRepository<TipClasa, Long> {
    List<TipClasa> findAllByOrderByNumeAsc();
}
