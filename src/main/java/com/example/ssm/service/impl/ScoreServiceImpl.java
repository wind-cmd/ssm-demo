package com.example.ssm.service.impl;
import com.example.ssm.dao.ScoreDao;
import com.example.ssm.service.ScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;

/**
 * ScoreServiceImpl
 * 成绩相关业务逻辑实现类，实现成绩查询等服务。
 */
@Service
public class ScoreServiceImpl implements ScoreService {
    @Autowired
    private ScoreDao scoreDao;

    /**
     * 查询指定学生的所有科目成绩
     * @param userId 学生ID
     * @return 每门科目的成绩及科目名
     */
    @Override
    public List<Map<String, Object>> getScoreListByUserId(Integer userId) {
        return scoreDao.getScoreListByUserId(userId);
    }

    @Override
    public List<Map<String, Object>> getScoreListByClass(String className) {
        return scoreDao.getScoreListByClass(className);
    }

    @Override
    public List<com.example.ssm.entity.Subject> getAllSubjects() {
        return scoreDao.getAllSubjects();
    }
} 