package com.example.demo14.Service;

import com.example.demo14.Entities.Airplane;
import com.example.demo14.Entities.Airport;
import com.example.demo14.Entities.Flight;
import com.example.demo14.Repository.FlightRepository;
import com.example.demo14.Entities.FlightState;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
@Transactional
public class FlightServiceImpl implements FlightService {
    private final FlightRepository flightRepository;
    private final AirplaneService airplaneService;
    private final AirportService aeroportService;


    @Override
    public Flight create(Flight flight) {
        flight.setTimeStamp(new Date());
        return flightRepository.save(flight);
    }

    @Override
    public List<Flight> get() {
        return flightRepository.findAll();
    }

    @Override
    public Flight edit(Flight flight) {
         return flightRepository.findById(flight.getIdVol()).map(vol1 -> {
            vol1.setIdVol(vol1.getIdVol());
            vol1.setAeroportDepart(flight.getAeroportDepart());
            vol1.setAeroportArrivee(flight.getAeroportArrivee());
            vol1.setFlightState(flight.getFlightState());
            vol1.setAltitude(flight.getAltitude());
            vol1.setAirports(flight.getAirports());
            vol1.setAirplane(flight.getAirplane());
             return flightRepository.save(vol1);
         }).orElseThrow(() -> new RuntimeException("flight non trouvé"));
    }

    @Override
    public String delete(Long id) {
        flightRepository.deleteById(id);
        return "Deleted";
    }

    @Override
    public boolean fuiteReservoir(Flight flight, Airplane airplane) {
        if(airplane.getActualConsumption() > airplane.getConsumption()){
            airplane.setQtiteCarburant(airplane.getQtiteCarburant() - airplane.getActualConsumption());
            flight.setFlightState(FlightState.FUITE_RESERVOIR);
            System.out.println("Fuite de carburant détectée !");
            System.out.println("Nouvelle quantité de kirosene : " + airplane.getQtiteCarburant());
            return true;
        }
        else{
            return false;
        }
    }

    @Override
    public boolean probMeteo(Flight flight) {
        double probabiliteMeteo = Math.random();
        if (probabiliteMeteo > 0.8) {
            flight.setFlightState(FlightState.PROB_METEO);
            System.out.println("Conditions météorologiques défavorables détectées !");
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean panne(Flight flight) {
        double probabilitePanne = Math.random();
        if (probabilitePanne > 0.8) {
            flight.setFlightState(FlightState.EN_PANNE);
            System.out.println("Panne detectée !");
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean retard(Flight flight) {
        /*if (flight.getVitesseActuelle()< flight.getVitesseNormale()) {
            flight.setFlightState(FlightState.RETARD);
            System.out.println("Retard détecté !");
            return true;
        } else {
            return false;
        }*/
        return false ;
    }

    @Override
    public boolean criseMondiale(Flight flight) {
        flight.setFlightState(FlightState.CRISE_MONDIALE);
        return true;
    }

    @Override
    public void volEscale(Flight flight, Airplane airplane, Airport depart, Airport escale, Airport arriveeFinale) {

        airplaneService.voler(depart,escale, airplane, flight);
        if(!criseMondiale(flight)){
            airplaneService.remplirReservoir(airplane.getIdAvion());
        }
        airplaneService.voler(escale,arriveeFinale, airplane, flight);

        System.out.println("Aéroport d'escale : " + escale.getName());
        System.out.println("Aéroport d'arrivée finale : " + arriveeFinale.getName());

    }

    @Override
    public float calculerDistanceCol(float lat1, float lon1,float alt1, float lat2, float lon2, float alt2) {
        // Calcul de la distance 3D entre deux avions
        float dX = lat2 - lat1;
        float dY = lon2 - lon1;
        float dZ = alt2 - alt1;
        return (float) Math.sqrt(dX * dX + dY * dY + dZ*dZ);
    }

    @Override
    public boolean detecterCollision(Flight flight1, Flight flight2) {
        // Calculer la distance entre les coordonnées des deux avions
        /*float distance = calculerDistanceCol(flight1.getLatitude(), flight1.getLatitude(), flight1.getAltitude(), flight2.getLatitude(), flight2.getLatitude(), flight2.getAltitude());

        return distance < DISTANCE_MIN_COLLISION;*/
        return false;

    }

    @Override
    public void gestionCasProb(Flight flight, Airplane airplane) {
        /*Airport airport = aeroportService.trouverAeroportLePlusProche(flight.getLatitude(), flight.getLongitude());

        if(probMeteo(flight)){
            flight.setAltitude(flight.getAltitude()+10);
            if (probMeteo(flight)){
                airplaneService.atterrir(airplane, airport);
            }
        }
        if (panne(flight)){

            airplaneService.atterrir(airplane, airport);
        }
        if(retard(flight)){
            while (flight.getVitesseActuelle() < flight.getVitesseNormale()){
                flight.setVitesseActuelle(flight.getVitesseActuelle()+10);
            }
        }
        if (fuiteReservoir(flight, airplane)) {
            //double actualConsumption = airplane.getActualCosumption();
            airplaneService.atterrir(airplane, airport);
        }

        List<Flight> listeFlights = get();
        for (Flight flight2 : listeFlights) {
            if (flight != flight2 && detecterCollision(flight, flight2)) {
                flight.setAltitude(flight.getAltitude() + 20);
            }
        }*/

    }
}
