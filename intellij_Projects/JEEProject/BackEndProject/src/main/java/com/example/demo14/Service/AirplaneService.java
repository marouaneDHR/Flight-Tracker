package com.example.demo14.Service;


import com.example.demo14.Entities.Airplane;
import com.example.demo14.Entities.Airport;
import com.example.demo14.Entities.Flight;

import java.util.List;

public interface AirplaneService {
    Airplane create(Airplane airplane);
    List<Airplane> get();
    Airplane getOne(Long id) ;
    Airplane edit(Long id, Airplane airplane);
    String delete(Long id);
    Airplane remplirReservoir(Long id);
    Airplane atterrir(Airplane airplane, Airport airport);
    String decoller(Airplane airplane);
    void voler(Airport depart, Airport arrivee, Airplane airplane, Flight flight);
    boolean consommerKerosene(double distance, Airplane airplane);

}
