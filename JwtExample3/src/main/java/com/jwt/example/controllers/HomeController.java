/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.jwt.example.controllers;

import com.jwt.example.entity.User;
import com.jwt.example.services.impl.CustomUserDetailService;
import com.jwt.example.services.impl.UserService;
import java.security.Principal;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Lenovo
 */
@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/api")
public class HomeController {
    
    @Autowired
    private UserService userService;
    
    //http://localhost:8081/home/users
    @GetMapping("/home/users")
    public List<User> getUser(){
        System.out.println("Getting users");
        return this.userService.getUser();
    }
    
    // @GetMapping("/current-user")
    // public User getCurrentUser(String email){
    //     return (User) this.customUserDetailService.loadUserByUsername(email);
    // }
}
