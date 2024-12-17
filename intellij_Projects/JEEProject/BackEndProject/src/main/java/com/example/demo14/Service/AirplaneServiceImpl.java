package com.example.demo14.Service;

import com.example.demo14.Entities.Airplane;
import com.example.demo14.Entities.Airport;
import com.example.demo14.Repository.*;
import com.example.demo14.Entities.Flight;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
@Transactional
public class AirplaneServiceImpl implements AirplaneService {

    private final AirplaneRepository airplaneRepository;
    private final AirportService aeroportService;

    @Override
    public Airplane create(Airplane airplane) {
        return airplaneRepository.save(airplane);
    }

    @Override
    public List<Airplane> get() {
        return airplaneRepository.findAll();
    }

    @Override
    public Airplane getOne(Long id) {
        return airplaneRepository.findById(id).orElseThrow();
    }

    @Override
    public Airplane edit(Long id, Airplane airplane) {
        return airplaneRepository.findById(id).map(airplane1 -> {
            airplane1.setIdAvion(airplane.getIdAvion());
            airplane1.setName(airplane.getName());
            airplane1.setTypeAvion(airplane.getTypeAvion());
            airplane1.setCapacity(airplane.getCapacity());
            airplane1.setConsumption(airplane.getConsumption());
            airplane1.setAutonomy(airplane.getAutonomy());
            airplane1.setCoordinate(airplane.getCoordinate());
            airplane1.setActualConsumption(airplane1.getActualConsumption());
            airplane1.setQtiteCarburant(airplane1.getQtiteCarburant());
            airplane1.setFlights(airplane1.getFlights());
            airplane1.setZ(airplane1.getZ());
            airplane1.setTargetAltitude(airplane1.getTargetAltitude());
            System.out.println("type : " + airplane.getTypeAvion()) ;
            return airplaneRepository.save(airplane1);
        }).orElseThrow(() -> new RuntimeException("Airplane non trouvé"));
    }

    @Override
    public String delete(Long id) {
        airplaneRepository.deleteById(id);
        return "Airplane supprimée";
    }

    @Override
    public String decoller(Airplane airplane) {

        while (airplane.getCoordinate().getLatitude() < airplane.getTargetAltitude()) {
            airplane.getCoordinate().setLatitude(airplane.getCoordinate().getLatitude()+ 1);
            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        airplaneRepository.save(airplane);
        System.out.println("L'airplane a decollé avec succès.");
        return "Décollage terminé pour l'airplane avec l'ID : " + airplane.getIdAvion();
    }

    @Override
    public Airplane atterrir(Airplane airplane, Airport airport) {
        double initialAltitude = airplane.getCoordinate().getLatitude() ;
        while (airplane.getCoordinate().getLatitude() > 0) {
            airplane.getCoordinate().setLatitude(airplane.getCoordinate().getLatitude() - 1);
        }
        airplaneRepository.save(airplane);
        return airplane;
    }

    public Airplane remplirReservoir(Long id) {

        Optional<Airplane> optionalAvion = airplaneRepository.findById(id);

        if (optionalAvion.isPresent()) {
            Airplane airplaneExist = optionalAvion.get();
            float quantiteCarburantAAjouter = airplaneExist.getActualConsumption();
            if (quantiteCarburantAAjouter > 0) {
                if ((airplaneExist.getQtiteCarburant() - airplaneExist.getActualConsumption()) >= quantiteCarburantAAjouter) {
                    airplaneExist.setQtiteCarburant(airplaneExist.getQtiteCarburant() + quantiteCarburantAAjouter);
                    airplaneRepository.save(airplaneExist);
                    return airplaneExist; // Retourne l'avion modifié
                } else {
                    throw new RuntimeException("Capacité maximale du réservoir dépassée");
                }
            } else {
                throw new RuntimeException("La quantité de carburant à ajouter doit être positive");
            }
        } else {
            throw new RuntimeException("Airplane non trouvé pour l'ID : " + id);
        }
    }

    public Collection<Flight> getAirplaneFlights(Long AirplaneId){
        Optional<Airplane> airplane = airplaneRepository.findById(AirplaneId);
        Collection<Flight> Flights = new ArrayList<Flight>();
        if(airplane.isPresent()){
            Flights =  airplane.get().getFlights() ;
        }
        return Flights ;
    }

    @Override
    public boolean consommerKerosene(double distance, Airplane airplane) {
        // Calcul de la consommation en fonction de la distance
        float consommationRequise = (float) (distance * airplane.getActualConsumption());
        // Vérifier s'il y a suffisamment de carburant
        if (airplane.getQtiteCarburant() >= consommationRequise) {
            // Mettre à jour la quantité de carburant
            airplane.setQtiteCarburant(airplane.getQtiteCarburant() - consommationRequise);
            return true;
        }else{
            return false;
        }
    }

    @Override
    public void voler(Airport depart, Airport arrivee, Airplane airplane, Flight flight) {
        if (consommerKerosene(aeroportService.distanceBetweenAirports(depart.getIdAeroport(),arrivee.getIdAeroport()), airplane)) {
            decoller(airplane);
            atterrir(airplane, arrivee);
            System.out.println("Flight de " + depart.getName() + " à " + arrivee.getName() + " réussi.");
        } else {
            System.out.println("Pas assez de kérosène pour effectuer le flight.");
        }
    }

}
