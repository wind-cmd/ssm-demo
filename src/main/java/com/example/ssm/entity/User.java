package com.example.ssm.entity;

import java.io.Serializable;

public class User implements Serializable {
    private static final long serialVersionUID = 1L;
    
    private Integer id;
    private String username;
    private String password;
    private Integer age;
    /** 班级名称 */
    private String className;
    
    // Getters and Setters
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public Integer getAge() {
        return age;
    }
    public void setAge(Integer age) {
        this.age = age;
    }
    public String getClassName() {
        return className;
    }
    public void setClassName(String className) {
        this.className = className;
    }
    
    @Override
    public String toString() {
        return "User [id=" + id + ", username=" + username + ", password=" + password + ", age=" + age + ", className=" + className + "]";
    }
}    