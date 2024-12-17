package com.example.demo14.Entities;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

import java.util.Collection;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor
public class Airplane {
    public enum TypeAvion {
        SHORT,
        MEDIUM,
        LONG
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAvion;
    private String name ;
    @Enumerated(EnumType.STRING)
    private TypeAvion typeAvion;
    private float capacity;
    private float consumption;
    private float ActualConsumption;
    private float qtiteCarburant;
    private double autonomy ;
    @Embedded
    private Coordinate coordinate;
    private float z;
    private float TargetAltitude;
    @JsonBackReference("airport-flights")
    @OneToMany(mappedBy = "airplane",fetch = FetchType.EAGER)
    private Collection<Flight> flights;

    public Airplane(Long idAvion, String name, Airplane.TypeAvion typeAvion,
                    float consumption, float capacity, float autonomy ) {
        this.idAvion = idAvion;
        this.name = name;
        this.typeAvion = typeAvion;
        this.consumption = consumption ;
        this.capacity = capacity ;
        this.autonomy = autonomy ;
        this.coordinate = new Coordinate(0,0) ;
        }
}
