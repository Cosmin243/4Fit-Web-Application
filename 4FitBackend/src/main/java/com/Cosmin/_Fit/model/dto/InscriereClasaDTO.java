package com.Cosmin._Fit.model.dto;

import com.Cosmin._Fit.model.InscriereClasa;

import java.time.LocalDateTime;

public record InscriereClasaDTO(
        Long id,
        Long clasaId,
        String clasaNume,
        String sala,
        String antrenor,
        LocalDateTime dataOra,
        String status
) {
    public static InscriereClasaDTO fromEntity(InscriereClasa inscriere) {
        var clasa = inscriere.getClasa();
        String antrenor = null;
        if (clasa != null && clasa.getAntrenor() != null) {
            antrenor = clasa.getAntrenor().getPrenume() + " " + clasa.getAntrenor().getNume();
        }

        return new InscriereClasaDTO(
                inscriere.getId(),
                clasa != null ? clasa.getId() : null,
                clasa != null ? clasa.getNume() : null,
                clasa != null ? clasa.getSala() : null,
                antrenor,
                clasa != null ? clasa.getDataOra() : null,
                inscriere.getStatus()
        );
    }
}
