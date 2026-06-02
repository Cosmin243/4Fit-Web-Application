package com.Cosmin._Fit.services;

import com.Cosmin._Fit.model.Abonament;
import com.Cosmin._Fit.model.TipAbonament;
import com.Cosmin._Fit.model.Utilizator;
import com.Cosmin._Fit.model.dto.AbonamentDTO;
import com.Cosmin._Fit.model.dto.TipAbonamentDTO;
import com.Cosmin._Fit.repositories.AbonamentRepository;
import com.Cosmin._Fit.repositories.TipAbonamentRepository;
import com.Cosmin._Fit.repositories.UtilizatorRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class AbonamentService {
    private final AbonamentRepository abonamentRepository;
    private final TipAbonamentRepository tipAbonamentRepository;
    private final UtilizatorRepository utilizatorRepository;
    private final UtilizatorService utilizatorService;

    public AbonamentService(AbonamentRepository abonamentRepository, TipAbonamentRepository tipAbonamentRepository,
                            UtilizatorRepository utilizatorRepository, UtilizatorService utilizatorService) {
        this.abonamentRepository = abonamentRepository;
        this.tipAbonamentRepository = tipAbonamentRepository;
        this.utilizatorRepository = utilizatorRepository;
        this.utilizatorService = utilizatorService;
    }

    public List<TipAbonamentDTO> getTipuriAbonamente() {
        return tipAbonamentRepository.findAll().stream().map(TipAbonamentDTO::fromEntity).toList();
    }

    public List<AbonamentDTO> getAbonamente(String keycloakId) {
        return abonamentRepository.findByKeycloakIdOrderByDataStartDesc(keycloakId).stream().map(AbonamentDTO::fromEntity).toList();
    }

    public List<AbonamentDTO> getAbonamenteActive(String keycloakId) {
        return abonamentRepository.findByKeycloakIdAndActivTrueOrderByDataEndDesc(keycloakId).stream().map(AbonamentDTO::fromEntity).toList();
    }

    @Transactional
    public AbonamentDTO cumpara(String keycloakId, Long tipAbonamentId) {
        Utilizator utilizator = utilizatorService.getByKeycloakId(keycloakId);
        utilizatorService.verificaAbonat(utilizator);

        TipAbonament tip = tipAbonamentRepository.findById(tipAbonamentId)
                .orElseThrow(() -> new RuntimeException("Tipul de abonament nu exista."));

        if (utilizator.getSold().compareTo(tip.getPret()) < 0) {
            throw new RuntimeException("Sold insuficient.");
        }

        utilizator.setSold(utilizator.getSold().subtract(tip.getPret()));
        utilizatorRepository.save(utilizator);

        Abonament abonament = new Abonament();
        abonament.setKeycloakId(keycloakId);
        abonament.setTipAbonament(tip);
        abonament.setDataStart(LocalDate.now());
        abonament.setDataEnd(LocalDate.now().plusDays(30));
        abonament.setSedinteClaseRamase(tip.getSedinteClase());
        abonament.setSedinteAntrenorRamase(tip.getSedinteAntrenor());
        abonament.setActiv(true);

        return AbonamentDTO.fromEntity(abonamentRepository.save(abonament));
    }
}
