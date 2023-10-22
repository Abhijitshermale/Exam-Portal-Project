package com.jwt.example.entity;

import org.springframework.security.core.GrantedAuthority;

class Authority implements GrantedAuthority{

    private String authority;
    
    public Authority (String authority){
        this.authority = authority;
        System.out.println(this.authority);
    }
    
    
    @Override
    public String getAuthority() {
        return this.authority;
    }
    
}