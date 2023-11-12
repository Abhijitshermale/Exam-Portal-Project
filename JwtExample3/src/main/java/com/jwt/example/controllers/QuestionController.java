package com.jwt.example.controllers;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jwt.example.entity.exam.Question;
import com.jwt.example.entity.exam.Quiz;
import com.jwt.example.services.QuestionService;
import com.jwt.example.services.QuizService;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/api/question")
public class QuestionController {
    
    @Autowired
    private QuestionService questionService;

    @Autowired
    private QuizService quizService;

    // add question
    @PostMapping("/")
    public ResponseEntity<Question> addQuestion(@RequestBody Question question){
        return ResponseEntity.ok(this.questionService.addQuestion(question));
    }

    //update question
    @PutMapping("/")
    public ResponseEntity<Question> updateQuestion(@RequestBody Question question){
        return ResponseEntity.ok(this.questionService.updateQuestion(question));
    }

    //get Questions
    @GetMapping("/")
    public ResponseEntity<?> getQuestions(){
        return ResponseEntity.ok(this.questionService.getQuestions());
    }

    //get Question
    @GetMapping("/{questionId}")
    public Question getQuestion(@PathVariable("questionId") Long questionId){
        return this.questionService.getQuestion(questionId);
    }

    //get all questions of any quiz
    @GetMapping("/quiz/{quizId}")
    public ResponseEntity<?> getQuizQuestion(@PathVariable("quizId") Long quizId){

        // Quiz quiz = new Quiz();
        // quiz.setQId(quizId);
        // Set<Question> questionOfQuiz = this.questionService.getQuestionsOfQuiz(quiz);
        // return ResponseEntity.ok(questionOfQuiz);

        Quiz quiz = this.quizService.getQuiz(quizId);
        Set<Question> questions = quiz.getQuestions();
        for(Question q: questions){
            q.setAnswer(null);
        }
        List<Question> list = new ArrayList<>(questions); 
        Collections.shuffle(list);
        if(list.size()>Integer.parseInt(quiz.getNumberOfQuestions())){
            list = list.subList(0, Integer.parseInt(quiz.getNumberOfQuestions()));
        }
        return ResponseEntity.ok(list);
    }

    //get all questions of any quiz
    @GetMapping("/quiz/all/{quizId}")
    public ResponseEntity<?> getQuizQuestionAdmin(@PathVariable("quizId") Long quizId){

        Quiz quiz = new Quiz();
        quiz.setQId(quizId);
        Set<Question> questionOfQuiz = this.questionService.getQuestionsOfQuiz(quiz);
        return ResponseEntity.ok(questionOfQuiz);
    }

    //delete Question
    @DeleteMapping("/{questionId}")
    public void deleteQuestion(@PathVariable("questionId") Long questionId){
        this.questionService.deleteQuestion(questionId);
    }

    // evaluate quiz
    @PostMapping("/eval-quiz")
    public ResponseEntity<?> evalQuiz(@RequestBody List<Question> questions){
        Integer correctAnswers=0;
        double marksGot = 0;
        Integer attemptedQuestion=0;
        for(Question q: questions){
            // single question 
            Question question = this.questionService.get(q.getQuesId());
            
            if(q.getGivenAnswer() != null && q.getGivenAnswer().trim() != ""){
                attemptedQuestion++;
                if(question.getAnswer().trim().equals(q.getGivenAnswer().trim())){
                    // correct answer
                    correctAnswers++;   
                    double marksSingle = Double.parseDouble(q.getQuiz().getMaxMarks())/questions.size();
                    marksGot +=  marksSingle;
                }
            }
        };
        Map<String, Object> map = Map.of("marksGot",marksGot, "correctAnswers",correctAnswers, "attemptedQuestion",attemptedQuestion);
        return ResponseEntity.ok(map);
    }
}   