package com.Cosmin._Fit.controllers;

import com.Cosmin._Fit.model.dto.AbonamentDTO;
import com.Cosmin._Fit.model.dto.InscriereClasaDTO;
import com.Cosmin._Fit.model.dto.ProfilDTO;
import com.Cosmin._Fit.services.AbonamentService;
import com.Cosmin._Fit.services.ClasaService;
import com.Cosmin._Fit.services.ProfilService;
import com.Cosmin._Fit.services.UtilizatorService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/me")
public class MeController {
    private final UtilizatorService utilizatorService;
    private final ProfilService profilService;
    private final AbonamentService abonamentService;
    private final ClasaService clasaService;

    public MeController(UtilizatorService utilizatorService, ProfilService profilService,
                        AbonamentService abonamentService, ClasaService clasaService) {
        this.utilizatorService = utilizatorService;
        this.profilService = profilService;
        this.abonamentService = abonamentService;
        this.clasaService = clasaService;
    }

    @PostMapping("/sync")
    public ResponseEntity<ProfilDTO> sync(JwtAuthenticationToken authentication) {
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
    public ResponseEntity<ProfilDTO> getMe(JwtAuthenticationToken authentication) {
        return ResponseEntity.ok(profilService.getProfil(authentication.getToken().getSubject()));
    }

    @GetMapping("/abonamente")
    public ResponseEntity<List<AbonamentDTO>> getAbonamente(JwtAuthenticationToken authentication) {
        return ResponseEntity.ok(abonamentService.getAbonamente(authentication.getToken().getSubject()));
    }

    @GetMapping("/inscrieri")
    public ResponseEntity<List<InscriereClasaDTO>> getInscrieri(JwtAuthenticationToken authentication) {
        return ResponseEntity.ok(clasaService.getInscrieriActive(authentication.getToken().getSubject()));
    }

    @PostMapping("/poza-profil")
    public ResponseEntity<ProfilDTO> uploadPozaProfil(@RequestParam("file") MultipartFile file, JwtAuthenticationToken authentication) {
        String keycloakId = authentication.getToken().getSubject();
        utilizatorService.salveazaPozaProfil(keycloakId, file);
        return ResponseEntity.ok(profilService.getProfil(keycloakId));
    }

    @DeleteMapping("/poza-profil")
    public ResponseEntity<ProfilDTO> stergePozaProfil(JwtAuthenticationToken authentication) {
        String keycloakId = authentication.getToken().getSubject();
        utilizatorService.stergePozaProfil(keycloakId);
        return ResponseEntity.ok(profilService.getProfil(keycloakId));
    }
}
