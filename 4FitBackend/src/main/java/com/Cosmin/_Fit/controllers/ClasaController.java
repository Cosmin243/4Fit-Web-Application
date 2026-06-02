package com.Cosmin._Fit.controllers;

import com.Cosmin._Fit.model.dto.ClasaDTO;
import com.Cosmin._Fit.model.dto.CreateClasaRequest;
import com.Cosmin._Fit.model.dto.InscriereClasaDTO;
import com.Cosmin._Fit.model.dto.TipClasaDTO;
import com.Cosmin._Fit.services.ClasaService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clase")
public class ClasaController {
    private final ClasaService clasaService;

    public ClasaController(ClasaService clasaService) {
        this.clasaService = clasaService;
    }

    @GetMapping
    public ResponseEntity<List<ClasaDTO>> getClase(JwtAuthenticationToken authentication) {
        String keycloakId = authentication != null ? authentication.getToken().getSubject() : null;
        return ResponseEntity.ok(clasaService.getClase(keycloakId));
    }

    @GetMapping("/admin")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_ADMINISTRATOR','ROLE_ADMINSTRATOR','ROLE_MANAGER')")
    public ResponseEntity<List<ClasaDTO>> getToateClasele() {
        return ResponseEntity.ok(clasaService.getToateClasele());
    }

    @GetMapping("/tipuri")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_ADMINISTRATOR','ROLE_ADMINSTRATOR','ROLE_MANAGER')")
    public ResponseEntity<List<TipClasaDTO>> getTipuriClase() {
        return ResponseEntity.ok(clasaService.getTipuriClase());
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_ADMINISTRATOR','ROLE_ADMINSTRATOR','ROLE_MANAGER')")
    public ResponseEntity<ClasaDTO> creeazaClasa(@RequestBody CreateClasaRequest request) {
        return ResponseEntity.ok(clasaService.creeazaClasa(request));
    }

    @PostMapping("/{clasaId}/inscriere")
    public ResponseEntity<InscriereClasaDTO> inscrie(@PathVariable Long clasaId, JwtAuthenticationToken authentication) {
        return ResponseEntity.ok(clasaService.inscrie(authentication.getToken().getSubject(), clasaId));
    }

    @DeleteMapping("/{clasaId}/inscriere")
    public ResponseEntity<Void> retrage(@PathVariable Long clasaId, JwtAuthenticationToken authentication) {
        clasaService.retrage(authentication.getToken().getSubject(), clasaId);
        return ResponseEntity.noContent().build();
    }
}
