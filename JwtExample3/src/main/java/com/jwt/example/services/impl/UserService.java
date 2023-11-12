/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.jwt.example.services.impl;

// import java.util.ArrayList;
import java.util.List;
import java.util.Set;
// import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.jwt.example.entity.User;
import com.jwt.example.entity.UserRole;
import com.jwt.example.repo.RoleRepository;
import com.jwt.example.repo.UserRepository;


/**
 *
 * @author Lenovo
 */
@Service
public class UserService {
    
    // private List<User> store = new ArrayList<>();

    // public UserService() {
    //     store.add(new User(UUID.randomUUID().toString(), "Abhijit", "abhijit@gm.com"));
    //     store.add(new User(UUID.randomUUID().toString(), "Srushti", "srushti@gm.com"));
    //     store.add(new User(UUID.randomUUID().toString(), "Neha", "Neha@gm.com"));
    //     store.add(new User(UUID.randomUUID().toString(), "Darshan", "Darshan@gm.com"));
    // }
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<User> getUser(){
        return userRepository.findAll();
    }

    // public User creatUser(User user){
    //     // user.setId(0).toString();
    //     user.setPassword(passwordEncoder.encode(user.getPassword()));
    //     return userRepository.save(user);

    // }
    public User createUser(User user, Set<UserRole> userRoles) throws Exception{
        User local = this.userRepository.findByEmail(user.getEmail());
        
        if(local != null){
            System.out.println("User is already there !!!");
            throw new Exception("User already present");
        }
        else{
            //user create
            for(UserRole ur: userRoles){
                roleRepository.save(ur.getRole());
            }
            
            user.getUserRole().addAll(userRoles);
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setUsername(user.getEmail());
            local = this.userRepository.save(user);
        }
        return local;
    
    } 
    public void deleteUser(Long userId) {
        this.userRepository.deleteById(userId);
    }
    
    //delete user
    public User updateUser(User user, String email ) {
        User local = this.userRepository.findByEmail(email);
         
         if(local == null){
                return null;
         }else{
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setUsername(user.getEmail());
         }
         
         local.setUsername(user.getUsername() != null ? user.getUsername() : local.getUsername());
         local.setFirstName(user.getFirstName() != null ? user.getFirstName() : local.getFirstName());
         local.setLastName(user.getLastName() != null ? user.getLastName() : local.getLastName());
         local.setPassword(user.getPassword() != null ? user.getPassword() : local.getPassword());
         local.setPhone(user.getPhone() != null ? user.getPhone() : local.getPhone());
         local.setEmail(user.getEmail() != null ? user.getEmail() : local.getEmail());
         local.setProfile(user.getProfile() != null ? user.getProfile() : local.getProfile());
         
         
        return userRepository.save(local);
    }        
}
