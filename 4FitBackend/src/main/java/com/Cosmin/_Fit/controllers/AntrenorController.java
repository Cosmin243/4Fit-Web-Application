package com.Cosmin._Fit.controllers;

import com.Cosmin._Fit.model.dto.AntrenorDTO;
import com.Cosmin._Fit.services.AntrenorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AntrenorController {
    private final AntrenorService antrenorService;

    public AntrenorController(AntrenorService antrenorService) {
        this.antrenorService = antrenorService;
    }

    @GetMapping("/api/antrenori")
    public ResponseEntity<List<AntrenorDTO>> getAntrenori() {
        return ResponseEntity.ok(antrenorService.getAntrenoriActivi());
    }
}
