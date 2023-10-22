/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.exam.model;

import org.springframework.security.core.GrantedAuthority;

/**
 *
 * @author Lenovo
 */
class Authority implements GrantedAuthority{

    private String authority;
    
    public Authority (String authority){
        this.authority = authority;
        System.out.println(this.authority);
    }
    
    
    @Override
    public String getAuthority() {
        throw new UnsupportedOperationException("Not supported yet."); // Generated from nbfs://nbhost/SystemFileSystem/Templates/Classes/Code/GeneratedMethodBody
    }
    
}
