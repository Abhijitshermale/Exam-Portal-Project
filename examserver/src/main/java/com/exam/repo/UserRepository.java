/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.exam.repo;

import com.exam.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Lenovo
 */

public interface UserRepository extends  JpaRepository<User, Long>{
    
    public User findByUserName(String username);
}
