package com.example.demo14.Service;

import com.example.demo14.Entities.Airport;
import com.example.demo14.Entities.Airplane;
import com.example.demo14.Entities.Flight;

import java.util.List;

public interface FlightService {
    Flight create(Flight flight);
    List<Flight> get();
    Flight edit(Flight flight);
    String delete(Long id);
    boolean fuiteReservoir(Flight flight, Airplane airplane);
    boolean probMeteo(Flight flight);
    boolean panne(Flight flight);
    boolean retard(Flight flight);
    boolean criseMondiale(Flight flight);
    void volEscale(Flight flight, Airplane airplane, Airport depart , Airport escale, Airport arriveeFinale);
    float calculerDistanceCol(float lat1, float lon1,float alt1, float lat2, float lon2, float alt2);
    boolean detecterCollision(Flight flight1, Flight flight2);
    void gestionCasProb(Flight flight, Airplane airplane);
}
