package com.jwt.example.services;

import java.util.List;
import java.util.Set;

import com.jwt.example.entity.exam.Category;
import com.jwt.example.entity.exam.Quiz;

public interface CategoryService {

    public Category addCategory(Category Category);
    
    public Category updateCategory(Category category);

    public Set<Category> getCategories();

    public Category getCategory(Long categoryId);

    public void deleteCategory(Long categoryId);


}