package com.Cosmin._Fit.model.dto;

import com.Cosmin._Fit.model.Antrenor;

public record AntrenorDTO(
        Long id,
        String nume,
        String prenume,
        String specialitate,
        Boolean activ
) {
    public static AntrenorDTO fromEntity(Antrenor antrenor) {
        return new AntrenorDTO(
                antrenor.getId(),
                antrenor.getNume(),
                antrenor.getPrenume(),
                antrenor.getSpecialitate(),
                antrenor.getActiv()
        );
    }
}
