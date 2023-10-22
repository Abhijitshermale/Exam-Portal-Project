/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.exam.service.impl;

import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.repo.RoleRepository;
import com.exam.repo.UserRepository;
import com.exam.service.UserService;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Lenovo
 */
@Service
public class UserServiceImpl  implements UserService{
    
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    @Override
    public User createUser(User user, Set<UserRole> userRoles) throws Exception{
        User local = this.userRepository.findByUserName(user.getUserName());
        
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
            local = this.userRepository.save(user);
        }
        return local;
    
    } 

    //getting user by user name
    @Override
    public User getUser(String userName) {
        return this.userRepository.findByUserName(userName);
    }

    //delete user by id
    @Override
    public void deleteUser(Long userId) {
        this.userRepository.deleteById(userId);
    }

    @Override
    public User updateUser(User user, String userName ) {
        User local = this.getUser(userName);
         
         if(local == null){
                return null;
         }  
         
         local.setUserName(user.getUserName() != null ? user.getUserName() : local.getUserName());
         local.setFirstName(user.getFirstName() != null ? user.getFirstName() : local.getFirstName());
         local.setLastName(user.getLastName() != null ? user.getLastName() : local.getLastName());
         local.setPassword(user.getPassword() != null ? user.getPassword() : local.getPassword());
         local.setPhone(user.getPhone() != null ? user.getPhone() : local.getPhone());
         local.setEmail(user.getEmail() != null ? user.getEmail() : local.getEmail());
         local.setProfile(user.getProfile() != null ? user.getProfile() : local.getProfile());
         
         
        return userRepository.save(local);
    }
    }
