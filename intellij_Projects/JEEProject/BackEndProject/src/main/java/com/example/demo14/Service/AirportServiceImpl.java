package com.example.demo14.Service;

import com.example.demo14.Entities.Airplane;
import com.example.demo14.Repository.AirplaneRepository;
import com.example.demo14.Repository.AirportRepository;
import com.sun.tools.jconsole.JConsoleContext;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import com.example.demo14.Entities.Airport;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Transactional
public class AirportServiceImpl implements AirportService {
    private final AirportRepository airportRepository;

    @Override
    public Airport create(Airport airport) {
        return airportRepository.save(airport);
    }

    @Override
    public List<Airport> getAll() {
        return airportRepository.findAll();
    }

    @Override
    public Airport edit(Long id, Airport airport) {
        return airportRepository.findById(id).map(aeroport1 -> {
            aeroport1.setIdAeroport(airport.getIdAeroport());
            aeroport1.setNbr_de_pistes(airport.getNbr_de_pistes());
            aeroport1.setCoordinate(airport.getCoordinate());
            aeroport1.setFlights(airport.getFlights());
            aeroport1.setName(airport.getName());
            aeroport1.setDelaiAnticollision(airport.getDelaiAnticollision());
            aeroport1.setDelaiAttenteSol(airport.getDelaiAttenteSol());
            aeroport1.setNbr_de_solles(airport.getNbr_de_solles());
            aeroport1.setDureeBoucleAttente(airport.getDureeBoucleAttente());
            aeroport1.setTempsAccesPiste(airport.getTempsAccesPiste());
            aeroport1.setTempsDecollageAtterissage(airport.getTempsDecollageAtterissage());
            return airportRepository.save(aeroport1);
        }).orElseThrow(() -> new RuntimeException("Airport non trouvé"));
    }

    @Override
    public String delete(Long id) {
        airportRepository.deleteById(id);
        return "DELETE DONE";
    }

    public double distanceBetweenAirports(Long idAeroport1, Long idAeroport2) {
        Airport airport1 = airportRepository.findById(idAeroport1)
                .orElseThrow(() -> new RuntimeException("Airport avec l'ID " + idAeroport1 + " non trouvé"));

        Airport airport2 = airportRepository.findById(idAeroport2)
                .orElseThrow(() -> new RuntimeException("Airport avec l'ID " + idAeroport2 + " non trouvé"));

        double distance = distanceBetweenPoints(
                airport1.getCoordinate().getLatitude(), airport1.getCoordinate().getLongitude(),
                airport2.getCoordinate().getLatitude(), airport2.getCoordinate().getLongitude());

        System.out.println("Distance entre l'aéroport d'ID " + idAeroport1 + " et l'aéroport d'ID " + idAeroport2 + " : " + distance + " kilomètres");

        return distance;
    }

    public Airport trouverAeroportLePlusProche(double latitude, double longitude) {
        List<Airport> tousLesAirports = airportRepository.findAll();

        Airport airportLePlusProche = null;
        double distanceMin = Double.MAX_VALUE;

        for (Airport airport : tousLesAirports) {

            double distance = distanceBetweenPoints(latitude, longitude, airport.getCoordinate().getLatitude(), airport.getCoordinate().getLongitude());

            if (distance < distanceMin) {
                distanceMin = distance;
                airportLePlusProche = airport;
            }
        }

        System.out.println("L'aéroport le plus proche a l'ID " + airportLePlusProche.getIdAeroport() +
                " avec une distance de " + distanceMin + " kilomètres.");

        return airportLePlusProche;
    }

    @Override
    public void addPlace(Long id) {
        Airport airport = airportRepository.findByIdAeroport(id);
        airport.setNbr_de_solles(airport.getNbr_de_solles()+1);
        edit(airport.getIdAeroport(), airport) ;
    }

    @Override
    public void removePlace(Long id) {
        Airport airport = airportRepository.findByIdAeroport(id);
        if(airport.getNbr_de_solles()> 0){
            airport.setNbr_de_solles(airport.getNbr_de_solles()-1);
            edit(airport.getIdAeroport(), airport) ;
        }
        else{
            System.out.println("Impossible") ;
        }
    }

    private double distanceBetweenPoints(double lat1, double lon1, double lat2, double lon2) {
        double thisLatitudeRad = Math.toRadians(lat1);
        double thisLongitudeRad = Math.toRadians(lon1);
        double otherLatitudeRad = Math.toRadians(lat2);
        double otherLongitudeRad = Math.toRadians(lon2);
        double dLatitude = otherLatitudeRad - thisLatitudeRad;
        double dLongitude = otherLongitudeRad - thisLongitudeRad;
        double a = Math.pow(Math.sin(dLatitude / 2), 2)
                + Math.cos(thisLatitudeRad) * Math.cos(otherLatitudeRad)
                * Math.pow(Math.sin(dLongitude / 2), 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        double earthRadius = 6371.0;
        return earthRadius * c;
    }



}
