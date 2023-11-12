package com.jwt.example.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jwt.example.entity.RefreshToken;
import java.util.Optional;


public interface RefreshTokenRepository extends JpaRepository<RefreshToken,String>{
    
    Optional<RefreshToken> findByRefreshToken(String token);
}