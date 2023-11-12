package com.jwt.example.services;

import java.util.Set;

import com.jwt.example.entity.exam.Question;

import com.jwt.example.entity.exam.Quiz;


public interface QuestionService {
    
    public Question addQuestion(Question question);

    public Question updateQuestion(Question question);

    public Set<Question> getQuestions();

    public Question getQuestion(Long questionId);

    public Set<Question> getQuestionsOfQuiz(Quiz quiz);
    
    public void deleteQuestion(Long questionId);

    public Question get(Long questionId);
}