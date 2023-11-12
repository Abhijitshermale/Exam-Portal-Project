package com.jwt.example.entity.exam;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Transient;

@Entity
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long quesId;

    @Column(length = 5000)
    private String content;

    private String image;

    private String option1;
    private String option2;
    private String option3;
    private String option4;

    private String answer;

    @Transient
    private String givenAnswer;
    
    @ManyToOne(fetch = FetchType.EAGER)
    private Quiz quiz;

    public Question() {
    }

    public Question(String content, String image, String option1, String option2, String option3, String option4,
            String answer) {
        this.content = content;
        this.image = image;
        this.option1 = option1;
        this.option2 = option2;
        this.option3 = option3;
        this.option4 = option4;
        this.answer = answer;
        }

    

    /**
     * @return long return the quesId
     */
    public long getQuesId() {
        return quesId;
    }

    /**
     * @param quesId the quesId to set
     */
    public void setQuesId(long quesId) {
        this.quesId = quesId;
    }

    /**
     * @return String return the content
     */
    public String getContent() {
        return content;
    }

    /**
     * @param content the content to set
     */
    public void setContent(String content) {
        this.content = content;
    }

    /**
     * @return String return the image
     */
    public String getImage() {
        return image;
    }

    /**
     * @param image the image to set
     */
    public void setImage(String image) {
        this.image = image;
    }

    /**
     * @return String return the option1
     */
    public String getOption1() {
        return option1;
    }

    /**
     * @param option1 the option1 to set
     */
    public void setOption1(String option1) {
        this.option1 = option1;
    }

    /**
     * @return String return the option2
     */
    public String getOption2() {
        return option2;
    }

    /**
     * @param option2 the option2 to set
     */
    public void setOption2(String option2) {
        this.option2 = option2;
    }

    /**
     * @return String return the option3
     */
    public String getOption3() {
        return option3;
    }

    /**
     * @param option3 the option3 to set
     */
    public void setOption3(String option3) {
        this.option3 = option3;
    }

    /**
     * @return String return the option4
     */
    public String getOption4() {
        return option4;
    }

    /**
     * @param option4 the option4 to set
     */
    public void setOption4(String option4) {
        this.option4 = option4;
    }

    /**
     * @return String return the answer
     */
    public String getAnswer() {
        return answer;
    }

    /**
     * @param answer the answer to set
     */
    public void setAnswer(String answer) {
        this.answer = answer;
    }

    /**
     * @return Quiz return the quiz
     */
    public Quiz getQuiz() {
        return quiz;
    }

    /**
     * @param quiz the quiz to set
     */
    public void setQuiz(Quiz quiz) {
        this.quiz = quiz;
    }
    /**
     * @return String return the givenAnswer
     */
    public String getGivenAnswer() {
        return givenAnswer;
    }

    /**
     * @param givenAnswer the givenAnswer to set
     */
    public void setGivenAnswer(String givenAnswer) {
        this.givenAnswer = givenAnswer;
    }

}