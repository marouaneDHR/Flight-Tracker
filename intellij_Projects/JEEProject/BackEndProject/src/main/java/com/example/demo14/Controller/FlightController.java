package com.example.demo14.Controller;

import com.example.demo14.Entities.Flight;
import com.example.demo14.Service.FlightService;
import com.example.demo14.Service.FlightServiceImpl;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/flights")
@CrossOrigin(origins = "*")
public class FlightController {
    private final FlightServiceImpl flightService;

    @PreAuthorize("hasAnyRole('USER', 'ADMIN', 'MANAGER')")
    @PostMapping("/new")
    public String createflight(@RequestBody Flight flight) {
        flightService.create(flight);
        return "Flight added succefully";
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN', 'MANAGER')")
    @GetMapping("/get")
    public Collection<Flight> getflight() {
        return flightService.get();
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN', 'MANAGER')")
    @PutMapping("/edit")
    public Flight editflight(@RequestBody Flight flight) {
        return flightService.edit(flight);
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN', 'MANAGER')")
    @DeleteMapping("/delete/{id}")
    public String deleteflight(@PathVariable Long id) {
        return flightService.delete(id);
    }
}
