package com.Cosmin._Fit.model.dto;

import com.Cosmin._Fit.model.Abonament;

import java.time.LocalDate;

public record AbonamentDTO(
        Long id,
        String tipAbonament,
        LocalDate dataStart,
        LocalDate dataEnd,
        Integer sedinteClaseRamase,
        Integer sedinteAntrenorRamase,
        Boolean activ
) {
    public static AbonamentDTO fromEntity(Abonament abonament) {
        return new AbonamentDTO(
                abonament.getId(),
                abonament.getTipAbonament() != null ? abonament.getTipAbonament().getNume() : null,
                abonament.getDataStart(),
                abonament.getDataEnd(),
                abonament.getSedinteClaseRamase(),
                abonament.getSedinteAntrenorRamase(),
                abonament.getActiv()
        );
    }
}
