package com.example.demo14.Service;

import com.example.demo14.Repository.AppUserRepository;

import com.example.demo14.jwtEntities.SecurityUser;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class JpaUserDetailsService implements UserDetailsService {

    private AppUserRepository appUserRepository ;

    public JpaUserDetailsService(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        SecurityUser sUser = new SecurityUser(appUserRepository.findByUsername(username)) ;
        return new User(sUser.getUsername(), sUser.getPassword(), sUser.getAuthorities());
    }

}
