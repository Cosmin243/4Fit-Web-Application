package com.Cosmin._Fit.services;

import com.Cosmin._Fit.model.Utilizator;
import com.Cosmin._Fit.model.dto.AbonamentDTO;
import com.Cosmin._Fit.model.dto.InscriereClasaDTO;
import com.Cosmin._Fit.model.dto.ProfilDTO;
import com.Cosmin._Fit.model.dto.TipAbonamentDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfilService {
    private final UtilizatorService utilizatorService;
    private final AbonamentService abonamentService;
    private final ClasaService clasaService;

    public ProfilService(UtilizatorService utilizatorService, AbonamentService abonamentService, ClasaService clasaService) {
        this.utilizatorService = utilizatorService;
        this.abonamentService = abonamentService;
        this.clasaService = clasaService;
    }

    public ProfilDTO getProfil(String keycloakId) {
        Utilizator utilizator = utilizatorService.getByKeycloakId(keycloakId);
        boolean abonat = utilizatorService.esteAbonat(utilizator);
        boolean adminSauManager = utilizatorService.esteAdminSauManager(utilizator);

        List<AbonamentDTO> abonamente = abonat ? abonamentService.getAbonamenteActive(keycloakId) : List.of();
        List<InscriereClasaDTO> inscrieri = abonat ? clasaService.getInscrieriActive(keycloakId) : List.of();
        List<TipAbonamentDTO> tipuri = abonat ? abonamentService.getTipuriAbonamente() : List.of();

        return new ProfilDTO(
                utilizator.getId(),
                utilizator.getKeycloakId(),
                utilizator.getNume(),
                utilizator.getPrenume(),
                utilizator.getEmail(),
                utilizator.getRol().getNumeRol(),
                utilizator.getStatus(),
                abonat ? utilizator.getPozaProfil() : null,
                abonat ? utilizator.getSold() : null,
                abonat,
                adminSauManager,
                abonamente,
                inscrieri,
                tipuri
        );
    }
}
