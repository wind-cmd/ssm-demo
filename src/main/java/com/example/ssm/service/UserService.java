package com.example.ssm.service;

import com.example.ssm.entity.User;

import java.util.List;

public interface UserService {
    List<User> getAllUsers();
    User getUserById(Integer id);
    void addUser(User user);
    void updateUser(User user);
    void deleteUser(Integer id);
    /** 按班级查询用户 */
    List<User> getUsersByClass(String className);
}    