package com.Cosmin._Fit.services;

import com.Cosmin._Fit.model.Abonament;
import com.Cosmin._Fit.model.Antrenor;
import com.Cosmin._Fit.model.Clasa;
import com.Cosmin._Fit.model.InscriereClasa;
import com.Cosmin._Fit.model.TipClasa;
import com.Cosmin._Fit.model.Utilizator;
import com.Cosmin._Fit.model.dto.ClasaDTO;
import com.Cosmin._Fit.model.dto.CreateClasaRequest;
import com.Cosmin._Fit.model.dto.InscriereClasaDTO;
import com.Cosmin._Fit.model.dto.TipClasaDTO;
import com.Cosmin._Fit.repositories.AbonamentRepository;
import com.Cosmin._Fit.repositories.AntrenorRepository;
import com.Cosmin._Fit.repositories.ClasaRepository;
import com.Cosmin._Fit.repositories.InscriereClasaRepository;
import com.Cosmin._Fit.repositories.TipClasaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.Normalizer;
import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.TemporalAdjusters;
import java.util.List;

@Service
public class ClasaService {
    private final ClasaRepository clasaRepository;
    private final InscriereClasaRepository inscriereClasaRepository;
    private final AbonamentRepository abonamentRepository;
    private final TipClasaRepository tipClasaRepository;
    private final AntrenorRepository antrenorRepository;
    private final UtilizatorService utilizatorService;

    public ClasaService(ClasaRepository clasaRepository, InscriereClasaRepository inscriereClasaRepository,
                        AbonamentRepository abonamentRepository, TipClasaRepository tipClasaRepository,
                        AntrenorRepository antrenorRepository, UtilizatorService utilizatorService) {
        this.clasaRepository = clasaRepository;
        this.inscriereClasaRepository = inscriereClasaRepository;
        this.abonamentRepository = abonamentRepository;
        this.tipClasaRepository = tipClasaRepository;
        this.antrenorRepository = antrenorRepository;
        this.utilizatorService = utilizatorService;
    }

    public List<ClasaDTO> getClase(String keycloakId) {
        LocalDateTime start = startOfCurrentWeek();
        LocalDateTime end = endOfCurrentWeek();
        return clasaRepository.findByActivaTrueAndDataOraBetweenOrderByDataOraAsc(start, end).stream()
                .map(clasa -> ClasaDTO.fromEntity(
                        clasa,
                        keycloakId != null && inscriereClasaRepository.existsByKeycloakIdAndClasaIdAndStatus(keycloakId, clasa.getId(), "ACTIVA")
                ))
                .toList();
    }

    public List<ClasaDTO> getToateClasele() {
        return clasaRepository.findAllByOrderByDataOraAsc().stream()
                .map(clasa -> ClasaDTO.fromEntity(clasa, false))
                .toList();
    }

    public List<TipClasaDTO> getTipuriClase() {
        return tipClasaRepository.findAllByOrderByNumeAsc().stream()
                .map(TipClasaDTO::fromEntity)
                .toList();
    }

    @Transactional
    public ClasaDTO creeazaClasa(CreateClasaRequest request) {
        if (request.nume() == null || request.nume().isBlank()) {
            throw new RuntimeException("Numele clasei este obligatoriu.");
        }
        if (request.dataOra() == null) {
            throw new RuntimeException("Data si ora clasei sunt obligatorii.");
        }
        if (request.durataMinute() == null || request.durataMinute() <= 0) {
            throw new RuntimeException("Durata trebuie sa fie mai mare decat 0.");
        }
        if (request.maxParticipanti() == null || request.maxParticipanti() <= 0) {
            throw new RuntimeException("Numarul maxim de participanti trebuie sa fie mai mare decat 0.");
        }
        if (!esteInSaptamanaCurenta(request.dataOra())) {
            throw new RuntimeException("Poti crea cursuri doar pentru saptamana curenta.");
        }

        if (request.tipClasaId() == null) {
            throw new RuntimeException("Tipul de clasa este obligatoriu.");
        }
        if (request.antrenorId() == null) {
            throw new RuntimeException("Antrenorul este obligatoriu.");
        }

        TipClasa tipClasa = tipClasaRepository.findById(request.tipClasaId())
                .orElseThrow(() -> new RuntimeException("Tipul de clasa nu exista."));
        Antrenor antrenor = antrenorRepository.findById(request.antrenorId())
                .orElseThrow(() -> new RuntimeException("Antrenorul nu exista."));

        if (!antrenorPoatePredaTipul(antrenor, tipClasa)) {
            throw new RuntimeException("Antrenorul ales nu poate preda acest tip de clasa.");
        }

        Clasa clasa = new Clasa();
        clasa.setId(clasaRepository.getUrmatorulId());
        clasa.setNume(request.nume().trim());
        clasa.setTipClasa(tipClasa);
        clasa.setAntrenor(antrenor);
        clasa.setSala(null);
        clasa.setDataOra(request.dataOra());
        clasa.setDurataMinute(request.durataMinute());
        clasa.setMaxParticipanti(request.maxParticipanti());
        clasa.setParticipantiInscrisi(0);
        clasa.setActiva(true);

        return ClasaDTO.fromEntity(clasaRepository.save(clasa), false);
    }

    private boolean antrenorPoatePredaTipul(Antrenor antrenor, TipClasa tipClasa) {
        String specialitate = normalizeaza(antrenor.getSpecialitate());
        String tip = normalizeaza(tipClasa.getNume());
        return !specialitate.isBlank() && (specialitate.contains(tip) || tip.contains(specialitate));
    }

    private boolean esteInSaptamanaCurenta(LocalDateTime dataOra) {
        return !dataOra.isBefore(startOfCurrentWeek()) && !dataOra.isAfter(endOfCurrentWeek());
    }

    private LocalDateTime startOfCurrentWeek() {
        return LocalDateTime.now()
                .with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY))
                .with(LocalTime.MIN);
    }

    private LocalDateTime endOfCurrentWeek() {
        return LocalDateTime.now()
                .with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY))
                .with(LocalTime.MAX);
    }

    private String normalizeaza(String value) {
        if (value == null) {
            return "";
        }

        return Normalizer.normalize(value, Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "")
                .toLowerCase()
                .trim();
    }

    public List<InscriereClasaDTO> getInscrieriActive(String keycloakId) {
        return inscriereClasaRepository.findByKeycloakIdAndStatusOrderByClasaDataOraAsc(keycloakId, "ACTIVA").stream()
                .map(InscriereClasaDTO::fromEntity)
                .toList();
    }

    @Transactional
    public InscriereClasaDTO inscrie(String keycloakId, Long clasaId) {
        Utilizator utilizator = utilizatorService.getByKeycloakId(keycloakId);
        utilizatorService.verificaAbonat(utilizator);

        if ("BANAT".equalsIgnoreCase(utilizator.getStatus())) {
            throw new RuntimeException("Utilizatorul este banat.");
        }

        Clasa clasa = clasaRepository.findById(clasaId).orElseThrow(() -> new RuntimeException("Clasa nu exista."));
        int participanti = clasa.getParticipantiInscrisi() != null ? clasa.getParticipantiInscrisi() : 0;

        if (participanti >= clasa.getMaxParticipanti()) {
            throw new RuntimeException("Nu mai sunt locuri disponibile.");
        }
        if (inscriereClasaRepository.existsByKeycloakIdAndClasaIdAndStatus(keycloakId, clasaId, "ACTIVA")) {
            throw new RuntimeException("Esti deja inscris la aceasta clasa.");
        }

        Abonament abonament = abonamentRepository
                .findFirstByKeycloakIdAndActivTrueAndSedinteClaseRamaseGreaterThanOrderByDataEndAsc(keycloakId, 0)
                .orElseThrow(() -> new RuntimeException("Nu ai abonament activ cu sedinte de clase ramase."));

        abonament.setSedinteClaseRamase(abonament.getSedinteClaseRamase() - 1);
        clasa.setParticipantiInscrisi(participanti + 1);

        InscriereClasa inscriere = new InscriereClasa();
        inscriere.setKeycloakId(keycloakId);
        inscriere.setClasa(clasa);
        inscriere.setAbonament(abonament);
        inscriere.setCreatedAt(LocalDateTime.now());
        inscriere.setStatus("ACTIVA");

        abonamentRepository.save(abonament);
        clasaRepository.save(clasa);
        return InscriereClasaDTO.fromEntity(inscriereClasaRepository.save(inscriere));
    }

    @Transactional
    public void retrage(String keycloakId, Long clasaId) {
        Utilizator utilizator = utilizatorService.getByKeycloakId(keycloakId);
        utilizatorService.verificaAbonat(utilizator);

        InscriereClasa inscriere = inscriereClasaRepository.findByKeycloakIdAndClasaIdAndStatus(keycloakId, clasaId, "ACTIVA")
                .orElseThrow(() -> new RuntimeException("Nu exista inscriere activa pentru aceasta clasa."));

        Abonament abonament = inscriere.getAbonament();
        abonament.setSedinteClaseRamase(abonament.getSedinteClaseRamase() + 1);

        Clasa clasa = inscriere.getClasa();
        int participanti = clasa.getParticipantiInscrisi() != null ? clasa.getParticipantiInscrisi() : 0;
        clasa.setParticipantiInscrisi(Math.max(0, participanti - 1));

        inscriere.setStatus("ANULATA");

        abonamentRepository.save(abonament);
        clasaRepository.save(clasa);
        inscriereClasaRepository.save(inscriere);
    }
}
