package com.example.demo14.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Collection;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Airport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAeroport;
    private String name;
    private int nbr_de_pistes;
    private int nbr_de_solles;
    private int delaiAttenteSol;
    private int TempsAccesPiste;
    private int delaiAnticollision;
    private String image;
    private int TempsDecollageAtterissage;
    private int dureeBoucleAttente;
    @Embedded
    private Coordinate coordinate ;
    @ManyToMany(mappedBy = "airports",fetch = FetchType.EAGER)
    @JsonBackReference("airports-flights")
    private Collection<Flight> flights = new ArrayList<>();

    public Airport(Long idAeroport, String name, Coordinate coordinate, String image) {
        this.idAeroport = idAeroport;
        this.name = name;
        this.coordinate = coordinate ;
        this.image = image ;
    }
}
