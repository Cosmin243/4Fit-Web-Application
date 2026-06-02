package com.Cosmin._Fit.model.dto;

import com.Cosmin._Fit.model.TipAbonament;

import java.math.BigDecimal;

public record TipAbonamentDTO(
        Long id,
        String nume,
        Boolean accesFitness,
        Boolean accesInot,
        Integer sedinteAntrenor,
        Integer sedinteClase,
        BigDecimal pret
) {
    public static TipAbonamentDTO fromEntity(TipAbonament tip) {
        return new TipAbonamentDTO(
                tip.getId(),
                tip.getNume(),
                tip.getAccesFitness(),
                tip.getAccesInot(),
                tip.getSedinteAntrenor(),
                tip.getSedinteClase(),
                tip.getPret()
        );
    }
}
