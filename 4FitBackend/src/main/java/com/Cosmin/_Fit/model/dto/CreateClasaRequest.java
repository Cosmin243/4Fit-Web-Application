package com.Cosmin._Fit.model.dto;

import java.time.LocalDateTime;

public record CreateClasaRequest(
        String nume,
        Long tipClasaId,
        Long antrenorId,
        LocalDateTime dataOra,
        Integer durataMinute,
        Integer maxParticipanti
) {
}
