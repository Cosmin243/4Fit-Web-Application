package com.Cosmin._Fit.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "clasa", schema = "fitdb")
@Data
public class Clasa {
    @Id
    private Long id;

    @ManyToOne
    @JoinColumn(name = "tip_clasa_id")
    private TipClasa tipClasa;

    @ManyToOne
    @JoinColumn(name = "antrenor_id")
    private Antrenor antrenor;

    private String nume;
    private String sala;

    @Column(name = "data_ora")
    private LocalDateTime dataOra;

    @Column(name = "durata_minute")
    private Integer durataMinute;

    @Column(name = "max_participanti")
    private Integer maxParticipanti;

    @Column(name = "participanti_inscrisi")
    private Integer participantiInscrisi;

    private Boolean activa;
}
