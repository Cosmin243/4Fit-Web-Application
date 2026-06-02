package com.Cosmin._Fit.model.dto;

import com.Cosmin._Fit.model.TipClasa;

public record TipClasaDTO(
        Long id,
        String nume
) {
    public static TipClasaDTO fromEntity(TipClasa tipClasa) {
        return new TipClasaDTO(tipClasa.getId(), tipClasa.getNume());
    }
}
