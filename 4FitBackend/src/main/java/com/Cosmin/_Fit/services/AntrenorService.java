package com.Cosmin._Fit.services;

import com.Cosmin._Fit.model.dto.AntrenorDTO;
import com.Cosmin._Fit.repositories.AntrenorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AntrenorService {
    private final AntrenorRepository antrenorRepository;

    public AntrenorService(AntrenorRepository antrenorRepository) {
        this.antrenorRepository = antrenorRepository;
    }

    public List<AntrenorDTO> getAntrenoriActivi() {
        return antrenorRepository.findByActivTrueOrderByNumeAscPrenumeAsc().stream()
                .map(AntrenorDTO::fromEntity)
                .toList();
    }
}
