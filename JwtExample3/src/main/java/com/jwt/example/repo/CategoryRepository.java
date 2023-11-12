package com.jwt.example.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jwt.example.entity.exam.Category;

public interface CategoryRepository extends JpaRepository<Category,Long> {
    
}