package com.Cosmin._Fit.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "antrenor", schema = "fitdb")
@Data
public class Antrenor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nume;
    private String prenume;
    private String specialitate;
    private Boolean activ;
}
