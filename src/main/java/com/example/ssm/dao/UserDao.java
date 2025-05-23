package com.example.ssm.dao;

import com.example.ssm.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface UserDao {
    List<User> getAllUsers();
    User getUserById(Integer id);
    void insertUser(User user);
    void updateUser(User user);
    void deleteUser(Integer id);
    /** 按班级查询用户 */
    List<User> getUsersByClass(@Param("className") String className);
}    