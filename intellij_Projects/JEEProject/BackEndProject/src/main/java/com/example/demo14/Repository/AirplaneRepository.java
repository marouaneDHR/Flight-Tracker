package com.example.demo14.Repository;


import com.example.demo14.Entities.Airplane;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AirplaneRepository extends JpaRepository <Airplane, Long> {
    Airplane findByIdAvion(Long id) ;
}
