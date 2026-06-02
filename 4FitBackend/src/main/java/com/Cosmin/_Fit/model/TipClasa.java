package com.Cosmin._Fit.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "tip_clasa", schema = "fitdb")
@Data
public class TipClasa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nume;
}
