package com.example.demo14.Repository;

import com.example.demo14.jwtEntities.AppRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AppRoleRepository extends JpaRepository<AppRole, Long> {
    AppRole findByRolename(String roleName) ;
}
