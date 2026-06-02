package com.Cosmin._Fit.model.dto;

import java.math.BigDecimal;
import java.util.List;

public record ProfilDTO(
        Long id,
        String keycloakId,
        String nume,
        String prenume,
        String email,
        String rol,
        String status,
        String pozaProfil,
        BigDecimal sold,
        boolean abonat,
        boolean adminSauManager,
        List<AbonamentDTO> abonamenteActive,
        List<InscriereClasaDTO> inscrieriActive,
        List<TipAbonamentDTO> tipuriAbonamente
) {
}
