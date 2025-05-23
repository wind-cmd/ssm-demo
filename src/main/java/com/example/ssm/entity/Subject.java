package com.example.ssm.entity;
import java.io.Serializable;

/**
 * Subject
 * 科目实体类，表示课程信息。
 */
public class Subject implements Serializable {
    /** 科目ID */
    private Integer id;
    /** 科目名称 */
    private String name;
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
} 