package com.Cosmin._Fit.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "roluri_utilizatori", schema = "fitdb")
@Data
public class RolUtilizator {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nume_rol", nullable = false)
    private String numeRol;
}
