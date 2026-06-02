package com.Cosmin._Fit.repositories;

import com.Cosmin._Fit.model.TipAbonament;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipAbonamentRepository extends JpaRepository<TipAbonament, Long> {
}
