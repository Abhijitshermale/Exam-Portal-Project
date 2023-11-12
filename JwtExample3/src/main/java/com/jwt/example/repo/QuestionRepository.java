package com.jwt.example.repo;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jwt.example.entity.exam.Question;
import com.jwt.example.entity.exam.Quiz;

public interface QuestionRepository extends JpaRepository<Question,Long>{

    Set<Question> findByQuiz(Quiz quiz);
    
}