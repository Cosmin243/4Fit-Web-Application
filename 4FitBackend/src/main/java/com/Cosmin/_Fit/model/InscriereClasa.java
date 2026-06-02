package com.Cosmin._Fit.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "inscriere_clasa", schema = "fitdb")
@Data
public class InscriereClasa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "keycloak_id", nullable = false)
    private String keycloakId;

    @ManyToOne
    @JoinColumn(name = "clasa_id")
    private Clasa clasa;

    @ManyToOne
    @JoinColumn(name = "abonament_id")
    private Abonament abonament;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    private String status;
}
