package com.Cosmin._Fit.model.dto;

import com.Cosmin._Fit.model.Clasa;

import java.time.LocalDateTime;

public record ClasaDTO(
        Long id,
        String nume,
        String tipClasa,
        String antrenor,
        String sala,
        LocalDateTime dataOra,
        Integer durataMinute,
        Integer maxParticipanti,
        Integer participantiInscrisi,
        Boolean activa,
        boolean inscris
) {
    public static ClasaDTO fromEntity(Clasa clasa, boolean inscris) {
        String antrenor = null;
        if (clasa.getAntrenor() != null) {
            antrenor = clasa.getAntrenor().getPrenume() + " " + clasa.getAntrenor().getNume();
        }

        return new ClasaDTO(
                clasa.getId(),
                clasa.getNume(),
                clasa.getTipClasa() != null ? clasa.getTipClasa().getNume() : null,
                antrenor,
                clasa.getSala(),
                clasa.getDataOra(),
                clasa.getDurataMinute(),
                clasa.getMaxParticipanti(),
                clasa.getParticipantiInscrisi(),
                clasa.getActiva(),
                inscris
        );
    }
}
