/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.exam.service;

import com.exam.model.User;
import com.exam.model.UserRole;
import java.util.Set;

/**
 *
 * @author Lenovo
 */
public interface UserService {
    
    //fro creating user
    
    public User createUser(User user, Set<UserRole> userRoles) throws Exception;
    
    //get user by username
    public  User getUser(String userName);
    
    //delete user by id
    public void deleteUser(Long userId);
    
    //update user by username
    public User updateUser(User user, String userName );
}
