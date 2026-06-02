package com.Cosmin._Fit.model.dto;

import com.Cosmin._Fit.model.Utilizator;

import java.math.BigDecimal;
import java.util.List;

public record UtilizatorDTO(
        Long id,
        String keycloakId,
        String rol,
        String nume,
        String prenume,
        String email,
        BigDecimal sold,
        String status,
        List<AbonamentDTO> abonamenteActive
) {
    public static UtilizatorDTO fromEntity(Utilizator utilizator) {
        return fromEntity(utilizator, List.of());
    }

    public static UtilizatorDTO fromEntity(Utilizator utilizator, List<AbonamentDTO> abonamenteActive) {
        return new UtilizatorDTO(
                utilizator.getId(),
                utilizator.getKeycloakId(),
                utilizator.getRol() != null ? utilizator.getRol().getNumeRol() : null,
                utilizator.getNume(),
                utilizator.getPrenume(),
                utilizator.getEmail(),
                utilizator.getSold(),
                utilizator.getStatus(),
                abonamenteActive
        );
    }
}
