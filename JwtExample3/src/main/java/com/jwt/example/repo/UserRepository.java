package com.jwt.example.repo;
import org.springframework.data.jpa.repository.JpaRepository;

import com.jwt.example.entity.User;

public interface UserRepository extends JpaRepository<User, Long>{
    
    public User findByEmail(String email);
}