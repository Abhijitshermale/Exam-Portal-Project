package com.jwt.example.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class UserRole {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private  Long userRoleId;
    
    //one role can have only one user
    @ManyToOne(fetch = FetchType.EAGER)
    private User user;
    
    @ManyToOne(fetch = FetchType.EAGER)
    private Role role;

    public Long getUserRoleId() {
        return userRoleId;
    }

    public void setUserRoleId(Long userRoleId) {
        this.userRoleId = userRoleId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
    
    

    public UserRole() {
    }

    public UserRole(Long userRoleId, User user) {
        this.userRoleId = userRoleId;
        this.user = user;
    }
}