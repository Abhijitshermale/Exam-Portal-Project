/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.exam.controller;

import com.exam.model.Role;
import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.service.UserService;
import java.util.HashSet;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Lenovo
 */
@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    //create user
    @PostMapping("/")
    public User createUser(@RequestBody User user) throws Exception{
        
        Set<UserRole> roles = new HashSet<>();
        
        Role role = new Role();
        role.setRoleId(45L);
        role.setRoleName("NORMAL");
        
        UserRole userRole = new UserRole();
        userRole.setUser(user);
        userRole.setRole(role);
        
        roles.add(userRole);
        
        return this.userService.createUser(user, roles);
    }
    
    @GetMapping("/{username}")
    public User getUser(@PathVariable("username") String username){
        return this.userService.getUser(username);
    }
    
    //delete user by id
    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable("userId") Long userId){
        this.userService.deleteUser(userId);
    }
    
    //update user 
    @PutMapping("/{username}")
     public User updateUser(@PathVariable("username") String username, @RequestBody User user){
         
         return this.userService.updateUser(user, username);
     }
}
