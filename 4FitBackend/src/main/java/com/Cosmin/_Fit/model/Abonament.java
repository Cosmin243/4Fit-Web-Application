package com.Cosmin._Fit.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "abonament", schema = "fitdb")
@Data
public class Abonament {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "keycloak_id", nullable = false)
    private String keycloakId;

    @ManyToOne
    @JoinColumn(name = "tip_abonament_id")
    private TipAbonament tipAbonament;

    @Column(name = "data_start")
    private LocalDate dataStart;

    @Column(name = "data_end")
    private LocalDate dataEnd;

    @Column(name = "sedinte_clase_ramase")
    private Integer sedinteClaseRamase;

    @Column(name = "sedinte_antrenor_ramase")
    private Integer sedinteAntrenorRamase;

    private Boolean activ;
}
