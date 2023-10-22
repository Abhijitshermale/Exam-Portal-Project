/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.exam.controller;

import com.exam.service.impl.UserDetailsServiceImpl;
import com.exam.utils.JwtUtils;
import com.exam.model.JWTRequest;
import com.exam.model.JWTResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Lenovo
 */
@RestController
public class AuthenticateController {
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private UserDetailsServiceImpl userDetailsServiceImpl;
    
    @Autowired
    private JwtUtils jwtUtils;
    
    @PostMapping("/generate-token")
    public ResponseEntity<?> generateToken(@RequestBody JWTRequest jwtRequest) throws Exception{
        try {
            authenticate(jwtRequest.getUserName(), jwtRequest.getPassword());
            
        } catch (UsernameNotFoundException e) {
            e.printStackTrace();
            throw new Exception("User Not Found");
        }
//        authenticated user
            UserDetails userDetails = this.userDetailsServiceImpl.loadUserByUsername(jwtRequest.getUserName());
            String token = this.jwtUtils.generateToken(userDetails);
            return ResponseEntity.ok(new JWTResponse(token));
    }
    
    private  void authenticate(String userName, String password) throws Exception{
        
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userName,password));
        } catch (DisabledException e) {
            throw new Exception("USER DISABLED" + e.getMessage());
        }catch(BadCredentialsException e){
            throw new Exception("Invalid Credential" +e.getMessage());
        }
    }
}
