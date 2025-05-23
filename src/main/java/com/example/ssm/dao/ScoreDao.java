package com.example.ssm.dao;

import org.apache.ibatis.annotations.Param;
import java.util.List;
import java.util.Map;
import com.example.ssm.entity.Subject;

/**
 * ScoreDao
 * 成绩数据访问层接口，负责与数据库交互，处理成绩相关的数据操作。
 */
public interface ScoreDao {
    /**
     * 查询某个学生所有科目成绩，带科目名
     * @param userId 学生ID
     * @return 每门科目的成绩及科目名，List中每个Map包含subjectName和score等信息
     */
    List<Map<String, Object>> getScoreListByUserId(@Param("userId") Integer userId);
    /**
     * 查询某班级所有学生所有科目成绩
     */
    List<Map<String, Object>> getScoreListByClass(@Param("className") String className);
    /**
     * 查询所有科目
     */
    List<Subject> getAllSubjects();
} 