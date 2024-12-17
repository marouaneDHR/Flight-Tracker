package com.example.demo14.Service;

import com.example.demo14.jwtEntities.AuthRequestDTO;
import com.example.demo14.jwtEntities.JwtResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    @Autowired
    private AuthenticationManager authenticationManager ;

    @Autowired
    private JpaUserDetailsService userDetailsService ;

    @Autowired
    private JwtService jwtService ;

    public JwtResponseDTO login(AuthRequestDTO requestDTO){
        System.out.println("Authenticarition begin");
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(requestDTO.getUsername(), requestDTO.getPassword()));
        System.out.println("Authenticarition done");
        if(authentication.isAuthenticated()){
            System.out.println("Generating token Started");
            UserDetails  userDetails = userDetailsService.loadUserByUsername(requestDTO.getUsername()) ;
            return JwtResponseDTO.builder()
                            .accessToken(jwtService.GenerateToken(userDetails.getUsername())).build();

        }else{
            throw new UsernameNotFoundException("Invalid User ...") ;
        }

    }
}
