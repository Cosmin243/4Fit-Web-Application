package com.Cosmin._Fit.model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Entity
@Table(name = "utilizatori", schema = "fitdb")
@Data
public class Utilizator {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "keycloak_id", unique = true, nullable = false)
    private String keycloakId;

    @ManyToOne
    @JoinColumn(name = "rol_id", nullable = false)
    private RolUtilizator rol;

    private String nume;
    private String prenume;
    private String email;

    @Column(precision = 10, scale = 2)
    private BigDecimal sold;

    private String status;

    @Column(name = "poza_profil", columnDefinition = "TEXT")
    private String pozaProfil;
}
