package com.example.demo14.Service;

import com.example.demo14.Entities.Airport;

import java.util.List;

public interface AirportService {

    Airport create(Airport airport);
    List<Airport> getAll();
    Airport edit(Long id, Airport airport);
    String delete(Long id);
    double distanceBetweenAirports(Long idAeroport1, Long idAeroport2);
    Airport trouverAeroportLePlusProche(double latitude, double longitude);
    void addPlace(Long id) ;
    void removePlace(Long id) ;
}
