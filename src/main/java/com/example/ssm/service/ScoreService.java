package com.example.ssm.service;
import java.util.List;
import java.util.Map;
import com.example.ssm.entity.Subject;

/**
 * ScoreService
 * 成绩相关业务逻辑接口，定义成绩查询等服务方法。
 */
public interface ScoreService {
    /**
     * 查询指定学生的所有科目成绩
     * @param userId 学生ID
     * @return 每门科目的成绩及科目名
     */
    List<Map<String, Object>> getScoreListByUserId(Integer userId);
    /**
     * 查询某班级所有学生所有科目成绩
     */
    List<Map<String, Object>> getScoreListByClass(String className);
    /**
     * 查询所有科目
     */
    List<Subject> getAllSubjects();
} 