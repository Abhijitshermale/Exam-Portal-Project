package com.jwt.example.services.impl;

import java.time.Instant;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jwt.example.entity.RefreshToken;
import com.jwt.example.entity.User;
import com.jwt.example.repo.RefreshTokenRepository;
import com.jwt.example.repo.UserRepository;

@Service
public class RefreshTokenService {
    
    public long refreshtokenVaildity = 5*60*60*1000;

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Autowired
    private UserRepository userRepository;

    public RefreshToken createRefreshToken(String userName){

        User user = userRepository.findByEmail(userName);
        RefreshToken refreshToken = user.getRefreshToken();

        if(refreshToken ==null){
            refreshToken = RefreshToken.builder()
                    .refreshToken(UUID.randomUUID().toString())
                    .expiry(Instant.now().plusMillis(refreshtokenVaildity))
                    .user(user)
                    .build();
        }else{
            refreshToken.setExpiry(Instant.now().plusMillis(refreshtokenVaildity));
        }

        user.setRefreshToken(refreshToken);

        refreshTokenRepository.save(refreshToken);

        return refreshToken;
    } 

    public RefreshToken verifyRefreshToken(String refreshToken){

        RefreshToken refreshToken1 =  refreshTokenRepository.findByRefreshToken(refreshToken).orElseThrow(() ->new RuntimeException("Given token does not exist on db !!!"));

        if(refreshToken1.getExpiry().compareTo(Instant.now())<0){   //if expiry time and currunt instant time comparison is less than 0 it means time has passed so we can't generate refresh token
            refreshTokenRepository.delete(refreshToken1);
            throw new RuntimeException("Refresh Token Expired");
        }

        return refreshToken1;
    }
}