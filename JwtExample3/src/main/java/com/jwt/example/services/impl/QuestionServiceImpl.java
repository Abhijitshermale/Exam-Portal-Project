package com.jwt.example.services.impl;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jwt.example.entity.exam.Question;
import com.jwt.example.entity.exam.Quiz;
import com.jwt.example.repo.QuestionRepository;
import com.jwt.example.services.QuestionService;

@Service
public class QuestionServiceImpl implements QuestionService{

    @Autowired
    private QuestionRepository questionRepository;

    @Override
    public Question addQuestion(Question question) {
        return this.questionRepository.save(question);
    }

    @Override
    public Question updateQuestion(Question question) {
        return this.questionRepository.save(question);
    }

    @Override
    public Set<Question> getQuestions() {
       return new HashSet<>(this.questionRepository.findAll());
    }

    @Override
    public Question getQuestion(Long questionId) {
        return this.questionRepository.findById(questionId).get();
    }

    @Override
    public Set<Question> getQuestionsOfQuiz(Quiz quiz) {
        return this.questionRepository.findByQuiz(quiz);
    }

    @Override
    public void deleteQuestion(Long questionId) {
       Question question = new Question();
       question.setQuesId(questionId);
       this.questionRepository.delete(question);
    }

    @Override
    public Question get(Long questionId) {
        return this.questionRepository.findById(questionId).get();
        // return this.questionRepository.getOne(questionId);
    }
    
}