package com.Cosmin._Fit.controllers;

import com.Cosmin._Fit.model.dto.AbonamentDTO;
import com.Cosmin._Fit.model.dto.TipAbonamentDTO;
import com.Cosmin._Fit.services.AbonamentService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AbonamentController {
    private final AbonamentService abonamentService;

    public AbonamentController(AbonamentService abonamentService) {
        this.abonamentService = abonamentService;
    }

    @GetMapping("/api/tip-abonamente")
    public ResponseEntity<List<TipAbonamentDTO>> getTipuriAbonamente() {
        return ResponseEntity.ok(abonamentService.getTipuriAbonamente());
    }

    @PostMapping("/api/abonamente/cumpara/{tipAbonamentId}")
    public ResponseEntity<AbonamentDTO> cumpara(@PathVariable Long tipAbonamentId, JwtAuthenticationToken authentication) {
        return ResponseEntity.ok(abonamentService.cumpara(authentication.getToken().getSubject(), tipAbonamentId));
    }
}
