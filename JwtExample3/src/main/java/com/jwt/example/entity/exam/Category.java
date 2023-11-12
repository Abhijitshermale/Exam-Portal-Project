package com.jwt.example.entity.exam;

import java.util.LinkedHashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long cid;

    private String title;
    
    @Column(length = 5000)
    private String description;

    @OneToMany(mappedBy = "category",cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Quiz> quizzes = new  LinkedHashSet<>();

    public Category(){

    }
    public Category(String title, String description){
        this.title = title;
        this.description = description;
    }

    /**
     * @return Long return the cid
     */
    public Long getCid() {
        return cid;
    }

    /**
     * @param cid the cid to set
     */
    public void setCid(Long cid) {
        this.cid = cid;
    }

    /**
     * @return String return the title
     */
    public String getTitle() {
        return title;
    }

    /**
     * @param title the title to set
     */
    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * @return String return the description
     */
    public String getDescription() {
        return description;
    }

    /**
     * @param description the description to set
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * @return Set<Quiz> return the quizzes
     */
    public Set<Quiz> getQuizzes() {
        return quizzes;
    }

    /**
     * @param quizzes the quizzes to set
     */
    public void setQuizzes(Set<Quiz> quizzes) {
        this.quizzes = quizzes;
    }

}