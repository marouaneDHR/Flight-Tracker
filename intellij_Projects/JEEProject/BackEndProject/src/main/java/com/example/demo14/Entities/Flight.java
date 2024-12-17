package com.example.demo14.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

@Entity
@Data @AllArgsConstructor @NoArgsConstructor @Builder
public class Flight {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idVol;
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    @Enumerated(EnumType.STRING)
    private FlightState flightState;
    private float altitude;
    private String aeroportDepart;
    private String aeroportArrivee;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date timeStamp ;
    @JsonBackReference("flight-airplane")
    @ManyToOne
    private Airplane airplane;
    @ManyToMany(fetch = FetchType.EAGER)
    @JsonBackReference("flight-airports")
    private Collection<Airport> airports = new ArrayList<>();

    public Flight(Long idVol, FlightState flightState, float altitude, String aeroportDepart, String aeroportArrivee,
                Airplane airplane, Collection<Airport> airports) {
        this.idVol = idVol;
        this.flightState = flightState;
        this.altitude = altitude;
        this.aeroportDepart = aeroportDepart;
        this.aeroportArrivee = aeroportArrivee;
        this.airplane = airplane ;
        this.airports = airports ;
     }
}
