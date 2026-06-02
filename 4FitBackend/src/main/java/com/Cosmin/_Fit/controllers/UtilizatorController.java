package com.Cosmin._Fit.controllers;

import com.Cosmin._Fit.model.dto.ProfilDTO;
import com.Cosmin._Fit.model.dto.UtilizatorDTO;
import com.Cosmin._Fit.services.ProfilService;
import com.Cosmin._Fit.services.UtilizatorService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/utilizatori")
public class UtilizatorController {
    private final UtilizatorService utilizatorService;
    private final ProfilService profilService;

    public UtilizatorController(UtilizatorService utilizatorService, ProfilService profilService) {
        this.utilizatorService = utilizatorService;
        this.profilService = profilService;
    }

    @GetMapping("/profil")
    public ResponseEntity<ProfilDTO> getProfilVechi(JwtAuthenticationToken authentication) {
        var jwt = authentication.getToken();
        utilizatorService.syncUser(
                jwt.getSubject(),
                jwt.getClaimAsString("email"),
                jwt.getClaimAsString("given_name"),
                jwt.getClaimAsString("family_name")
        );
        return ResponseEntity.ok(profilService.getProfil(jwt.getSubject()));
    }

    @GetMapping
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_ADMINISTRATOR','ROLE_ADMINSTRATOR','ROLE_MANAGER')")
    public ResponseEntity<List<UtilizatorDTO>> getUtilizatori() {
        return ResponseEntity.ok(utilizatorService.getTotiUtilizatorii().stream()
                .map(utilizator -> UtilizatorDTO.fromEntity(utilizator, utilizatorService.getAbonamenteActive(utilizator)))
                .toList());
    }

    @PatchMapping("/{utilizatorId}/ban")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_ADMINISTRATOR','ROLE_ADMINSTRATOR','ROLE_MANAGER')")
    public ResponseEntity<UtilizatorDTO> baneaza(@PathVariable Long utilizatorId) {
        return ResponseEntity.ok(UtilizatorDTO.fromEntity(utilizatorService.actualizeazaStatus(utilizatorId, "BANAT")));
    }

    @PatchMapping("/{utilizatorId}/deban")
    @PreAuthorize("hasAnyAuthority('ROLE_ADMIN','ROLE_ADMINISTRATOR','ROLE_ADMINSTRATOR','ROLE_MANAGER')")
    public ResponseEntity<UtilizatorDTO> debaneaza(@PathVariable Long utilizatorId) {
        return ResponseEntity.ok(UtilizatorDTO.fromEntity(utilizatorService.actualizeazaStatus(utilizatorId, "ACTIV")));
    }
}
