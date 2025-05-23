package com.example.ssm.entity;
import java.io.Serializable;

/**
 * Score
 * 成绩实体类，表示学生在某门科目的成绩。
 */
public class Score implements Serializable {
    /** 成绩ID */
    private Integer id;
    /** 学生ID */
    private Integer userId;
    /** 科目ID */
    private Integer subjectId;
    /** 分数 */
    private Double score;
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public Integer getUserId() { return userId; }
    public void setUserId(Integer userId) { this.userId = userId; }
    public Integer getSubjectId() { return subjectId; }
    public void setSubjectId(Integer subjectId) { this.subjectId = subjectId; }
    public Double getScore() { return score; }
    public void setScore(Double score) { this.score = score; }
} 