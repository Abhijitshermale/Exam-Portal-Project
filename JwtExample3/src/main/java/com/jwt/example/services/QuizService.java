package com.jwt.example.services;

import java.util.List;
import java.util.Set;

import org.springframework.http.ResponseEntity;

import com.jwt.example.entity.exam.Category;
import com.jwt.example.entity.exam.Quiz;

public interface QuizService {

    public Quiz addQuiz(Quiz quiz);

    public Quiz updateQuiz(Quiz quiz);

    public Set<Quiz> getQuizzes();

    public Quiz getQuiz(Long quizId);

    public void deleteQuiz(long quizId);

    public List<Quiz> getQuizzesofCategory(Category category);
    
    public List<Quiz> getActiveQuizzes();
    
    public List<Quiz> getActiveQuizzesOfCategory(Category c);
}