    package com.example.demo14.Controller;

    import com.example.demo14.Entities.Airport;
    import com.example.demo14.Service.AirportService;
    import com.example.demo14.Service.AirportServiceImpl;
    import jakarta.persistence.Id;
    import lombok.AllArgsConstructor;
    import org.springframework.security.access.prepost.PreAuthorize;
    import org.springframework.web.bind.annotation.*;

    import java.util.Collection;
    import java.util.List;

    @RestController
    @AllArgsConstructor
    @RequestMapping("/airports")
    @CrossOrigin(origins = "*")
    public class AirportController {
        private final AirportServiceImpl aeroportService;

        @PreAuthorize("hasAnyRole('USER', 'ADMIN', 'MANAGER')")
        @PostMapping("/new")
        public Airport createAeroport(@RequestBody Airport airport) {
            return aeroportService.create(airport);
        }

        @PreAuthorize("hasAnyRole('USER', 'ADMIN', 'MANAGER')")
        @GetMapping("/get")
        public Collection<Airport> getAeroport() {
            return aeroportService.getAll();
        }

        @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
        @PutMapping("/edit/{id}")
        public Airport editAeroport(@PathVariable Long id, @RequestBody Airport airport) {
            return aeroportService.edit(id, airport);
        }

        @PreAuthorize("hasAnyRole('USER', 'ADMIN', 'MANAGER')")
        @DeleteMapping("/delete/{id}")
        public String deleteAeroport(@PathVariable Long id) {
            return aeroportService.delete(id);
        }

        @PostMapping("/addPlace/{id}")
        public String addPlace(@PathVariable Long id){
            aeroportService.addPlace(id);
            return "Places has been increased" ;
        }

        @PostMapping("removePlace/{id}")
        public String removePlace(@PathVariable Long id){
            aeroportService.removePlace(id);
            return "Places has been removed" ;
        }

    }
