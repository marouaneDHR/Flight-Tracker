package com.example.demo14.Repository;


import com.example.demo14.Entities.Airplane;
import com.example.demo14.Entities.Airport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AirportRepository extends JpaRepository <Airport, Long> {
    Airport findByIdAeroport(Long id) ;

}
