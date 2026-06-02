package com.Cosmin._Fit.services;

import com.Cosmin._Fit.model.RolUtilizator;
import com.Cosmin._Fit.model.Utilizator;
import com.Cosmin._Fit.model.dto.AbonamentDTO;
import com.Cosmin._Fit.repositories.RolUtilizatorRepository;
import com.Cosmin._Fit.repositories.AbonamentRepository;
import com.Cosmin._Fit.repositories.UtilizatorRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.Base64;
import java.util.List;

@Service
public class UtilizatorService {

    private final UtilizatorRepository utilizatorRepository;
    private final RolUtilizatorRepository rolRepository;
    private final AbonamentRepository abonamentRepository;

    public UtilizatorService(UtilizatorRepository utilizatorRepository, RolUtilizatorRepository rolRepository,
                             AbonamentRepository abonamentRepository) {
        this.utilizatorRepository = utilizatorRepository;
        this.rolRepository = rolRepository;
        this.abonamentRepository = abonamentRepository;
    }

    @Transactional
    public Utilizator syncUser(String keycloakId, String email, String prenume, String nume) {
        return utilizatorRepository.findByKeycloakId(keycloakId)
                .map(utilizator -> updateBasicInfo(utilizator, email, prenume, nume))
                .orElseGet(() -> createUser(keycloakId, email, prenume, nume));
    }

    public Utilizator getByKeycloakId(String keycloakId) {
        return utilizatorRepository.findByKeycloakId(keycloakId)
                .orElseThrow(() -> new RuntimeException("Utilizatorul nu exista. Apeleaza mai intai /api/me/sync."));
    }

    public List<Utilizator> getTotiUtilizatorii() {
        return utilizatorRepository.findAllByOrderByNumeAscPrenumeAsc();
    }

    public List<AbonamentDTO> getAbonamenteActive(Utilizator utilizator) {
        return abonamentRepository.findByKeycloakIdAndActivTrueOrderByDataEndDesc(utilizator.getKeycloakId()).stream()
                .map(AbonamentDTO::fromEntity)
                .toList();
    }

    @Transactional
    public Utilizator actualizeazaStatus(Long utilizatorId, String status) {
        Utilizator utilizator = utilizatorRepository.findById(utilizatorId)
                .orElseThrow(() -> new RuntimeException("Utilizatorul nu exista."));

        utilizator.setStatus(status);
        return utilizatorRepository.save(utilizator);
    }

    public boolean esteAbonat(Utilizator utilizator) {
        String rol = utilizator.getRol().getNumeRol();
        return "ABONAT".equalsIgnoreCase(rol) || "USER".equalsIgnoreCase(rol);
    }

    public boolean esteAdminSauManager(Utilizator utilizator) {
        String rol = utilizator.getRol().getNumeRol();
        return "ADMIN".equalsIgnoreCase(rol) || "ADMINISTRATOR".equalsIgnoreCase(rol) || "MANAGER".equalsIgnoreCase(rol);
    }

    public void verificaAbonat(Utilizator utilizator) {
        if (!esteAbonat(utilizator)) {
            throw new RuntimeException("Doar abonatii pot folosi aceasta functionalitate.");
        }
    }

    @Transactional
    public Utilizator salveazaPozaProfil(String keycloakId, MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new RuntimeException("Alege o imagine pentru profil.");
        }
        if (file.getContentType() == null || !file.getContentType().startsWith("image/")) {
            throw new RuntimeException("Fisierul trebuie sa fie o imagine.");
        }
        if (file.getSize() > 2 * 1024 * 1024) {
            throw new RuntimeException("Imaginea trebuie sa aiba maximum 2 MB.");
        }

        try {
            Utilizator utilizator = getByKeycloakId(keycloakId);
            verificaAbonat(utilizator);

            String base64 = Base64.getEncoder().encodeToString(file.getBytes());
            utilizator.setPozaProfil("data:" + file.getContentType() + ";base64," + base64);
            return utilizatorRepository.save(utilizator);
        } catch (IOException exception) {
            throw new RuntimeException("Nu s-a putut salva poza de profil.");
        }
    }

    @Transactional
    public Utilizator stergePozaProfil(String keycloakId) {
        Utilizator utilizator = getByKeycloakId(keycloakId);
        verificaAbonat(utilizator);

        utilizator.setPozaProfil(null);
        return utilizatorRepository.save(utilizator);
    }

    private Utilizator updateBasicInfo(Utilizator utilizator, String email, String prenume, String nume) {
        utilizator.setEmail(email);
        utilizator.setPrenume(prenume);
        utilizator.setNume(nume);
        return utilizatorRepository.save(utilizator);
    }

    private Utilizator createUser(String keycloakId, String email, String prenume, String nume) {
        RolUtilizator rolAbonat = rolRepository.findByNumeRolIgnoreCase("ABONAT")
                .or(() -> rolRepository.findByNumeRolIgnoreCase("USER"))
                .orElseThrow(() -> new RuntimeException("Rolul ABONAT sau USER nu exista in BD."));

        Utilizator nou = new Utilizator();
        nou.setKeycloakId(keycloakId);
        nou.setEmail(email);
        nou.setPrenume(prenume);
        nou.setNume(nume);
        nou.setRol(rolAbonat);
        nou.setSold(new BigDecimal("300.00"));
        nou.setStatus("ACTIV");
        return utilizatorRepository.save(nou);
    }
}
