package com.jwt.example.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jwt.example.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
    
}