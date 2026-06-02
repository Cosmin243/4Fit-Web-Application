package com.Cosmin._Fit.model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Entity
@Table(name = "tip_abonament", schema = "fitdb")
@Data
public class TipAbonament {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nume;

    @Column(name = "acces_fitness")
    private Boolean accesFitness;

    @Column(name = "acces_inot")
    private Boolean accesInot;

    @Column(name = "sedinte_antrenor")
    private Integer sedinteAntrenor;

    @Column(name = "sedinte_clase")
    private Integer sedinteClase;

    @Column(precision = 10, scale = 2)
    private BigDecimal pret;
}
