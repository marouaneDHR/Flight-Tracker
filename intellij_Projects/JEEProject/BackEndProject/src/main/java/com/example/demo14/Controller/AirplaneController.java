package com.example.demo14.Controller;


import com.example.demo14.Entities.Airplane;
import com.example.demo14.Entities.Flight;
import com.example.demo14.Service.AirplaneService;
import com.example.demo14.Service.AirplaneServiceImpl;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/airplanes")
@CrossOrigin(origins = "*")
public class AirplaneController {
    private final AirplaneServiceImpl airplaneService;

    @PreAuthorize("hasAnyRole('USER', 'ADMIN', 'MANAGER')")
    @PostMapping("/new")
    public String createAirplane(@RequestBody Airplane airplane) {
        airplaneService.create(airplane);
        return "Done succefully" ;
    }

    @GetMapping("/getOne/{id}")
    public Airplane getAirplane(@PathVariable Long id){
        return airplaneService.getOne(id) ;
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN', 'MANAGER')")
    @GetMapping("/get")
    public Collection<Airplane> getAirplanes() {
        return airplaneService.get();
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @PutMapping("/edit/{id}")
    public Airplane editAirplane(@PathVariable Long id, @RequestBody Airplane airplane) {
        Airplane airplane1 = airplaneService.edit(id, airplane) ;
        return airplane1 ;
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @DeleteMapping("/delete/{id}")
    public String deleteAirplane(@PathVariable Long id) {
        return airplaneService.delete(id);
    }

    @GetMapping("/getFlights/{AirplaneId}")
    public Collection<Flight> flights(@PathVariable Long AirplaneId){
        return airplaneService.getAirplaneFlights(AirplaneId);
    }
}