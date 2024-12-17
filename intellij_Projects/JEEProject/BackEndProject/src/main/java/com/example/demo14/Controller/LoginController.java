package com.example.demo14.Controller;

import com.example.demo14.Service.AuthenticationService;
import com.example.demo14.jwtEntities.AuthRequestDTO;
import com.example.demo14.jwtEntities.JwtResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class LoginController {
    @Autowired
    private AuthenticationService authenticationService ;

    @PostMapping("/login")
    public JwtResponseDTO AuthenticateAndGetToken(@RequestBody AuthRequestDTO authRequestDTO){
        return authenticationService.login(authRequestDTO) ;
    }
}
