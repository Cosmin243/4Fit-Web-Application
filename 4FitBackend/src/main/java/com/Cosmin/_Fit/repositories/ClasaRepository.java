package com.Cosmin._Fit.repositories;

import com.Cosmin._Fit.model.Clasa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ClasaRepository extends JpaRepository<Clasa, Long> {
    List<Clasa> findByActivaTrueOrderByDataOraAsc();
    List<Clasa> findByActivaTrueAndDataOraBetweenOrderByDataOraAsc(LocalDateTime start, LocalDateTime end);
    List<Clasa> findAllByOrderByDataOraAsc();

    @Query("select coalesce(max(c.id), 0) + 1 from Clasa c")
    Long getUrmatorulId();
}
